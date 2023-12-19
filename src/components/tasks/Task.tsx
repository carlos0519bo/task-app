import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TaskProps } from '../../types';
import { EvilIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useTodoStore } from '../../store/store';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  task: TaskProps;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export const Task = ({ task }: Props) => {
  const { title, startTask, endtTask, category } = task;
  const { deleteTask } = useTodoStore();

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(100);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldDelete = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldDelete) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && deleteTask) {
            runOnJS(deleteTask)(task.id);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconContainerStyle= useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return {
      opacity
    }
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value
    }
  })

  return (
    <Animated.View style={[styles.container, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconDeleteContainer, rIconContainerStyle]}>
        <EvilIcons name="trash" size={110 * 0.4} color="#E74C3C" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.infoTaskContainer, rStyle]}>
          <View style={{ flexDirection: 'row', width: '70%' }}>
            <View style={[styles.categoryDecorator, category && { backgroundColor: category.color }]} />
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={styles.taskTitle} numberOfLines={2}>
                {title}
              </Text>
              {category && (
                <View style={[styles.chip, { backgroundColor: category.color }]}>
                  <Text style={styles.chipText}>{category.label}</Text>
                </View>
              )}
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>
              {startTask && moment(startTask).format('HH:mm')}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#808B96' }}>
              {endtTask && moment(endtTask).format('HH:mm')}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: -2
  },
  infoTaskContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  categoryDecorator: {
    width: 4,
    borderRadius: 4,
    height: '100%',
    backgroundColor: '#148F77',
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  iconDeleteContainer: {
    height: 110,
    width: 110,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
