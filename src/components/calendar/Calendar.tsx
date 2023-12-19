import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Date } from './Date';

const firstColor = '#fea48a';
const secondColor = '#37aabd';

interface Propos {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectDate: React.Dispatch<React.SetStateAction<string | null>>;
  selected: string | null;
}

export const Calendar = ({
  setIsModalOpen,
  onSelectDate,
  selected,
}: Propos) => {
  const [dates, setDates] = useState<moment.Moment[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');

  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    const month = moment().format('MMMM');
    setCurrentMonth(month);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[firstColor, secondColor]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <EvilIcons name="plus" size={45} color="#FAFAFA" />
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          {dates.map((date, index) => (
            <Date
              key={index}
              date={date}
              onSelectDate={onSelectDate}
              selected={selected}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: '100%',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerContainer: {
    width: '100%',
    marginTop: '16%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthText: {
    marginLeft: 8,
    fontSize: 35,
    fontWeight: '600',
    color: '#FAFAFA',
    textShadowColor: 'rgba(0, 0, 0, 0.10)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.2,
    textTransform: 'capitalize',
  },
  daysContainer: {
    height: 80,
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fafafacd',
    textShadowColor: 'rgba(0, 0, 0, 0.10)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
