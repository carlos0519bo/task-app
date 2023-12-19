import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, TaskList } from '../components';
import { MotivationalMessages } from '../components/messages';
import moment from 'moment';
import { TaskModal } from '../components/modal';

export const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(moment().format('YYYY-MM-DD'));
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        setIsModalOpen={setIsModalOpen}
        onSelectDate={setSelectedDate}
        selected={selectedDate}
      />
      <MotivationalMessages />
      <TaskList />
      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDate={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
