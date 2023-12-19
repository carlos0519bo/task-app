import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { messages } from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

const firstColor = '#e247af';
const secondColor = '#fea48a';

export const MotivationalMessages = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[firstColor, secondColor]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <Ionicons
          name="leaf-sharp"
          size={30}
          color="#FAFAFA"
          style={{ position: 'absolute', left: 52 }}
        />
        <Carousel
          width={300}
          height={80}
          autoPlay
          vertical
          autoPlayInterval={1000 * 30}
          loop
          scrollAnimationDuration={2000}
          enabled={false}
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.textContent}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    marginVertical: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContent: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
