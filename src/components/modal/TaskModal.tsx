import React, { useState } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskProps } from '../../types';
import { useTodoStore } from '../../store/store';
import { Categories, idGenerator } from '../../utils';
import { DropdownComponent } from '../dropdown';

type ModalProps = {
  isModalOpen: boolean;
  selectedDate: string | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedDate,
}: ModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [notification, setNotification] = useState(false);
  const [category, setCategory] = useState<Categories | null>(null);
  const { addTask } = useTodoStore();

  const toggleAllDay = () => setAllDay((previousState) => !previousState);
  const toggleNotification = () =>
    setNotification((previousState) => !previousState);

  const onCloseModal = () => {
    setIsModalOpen(false);
    setTaskName('');
    setAllDay(false);
    setStartTime(new Date());
    setEndTime(new Date());
    setNotification(false);
    setCategory(null);
  };

  const handleInputChange = (text: string) => {
    setTaskName(text);
  };

  const handleSubmit = () => {
    const newTask: TaskProps = {
      title: taskName,
      allDay: allDay,
      withAlert: notification,
      startTask: !allDay ? startTime : null,
      endtTask: !allDay ? endTime : null,
      date: selectedDate,
      id: idGenerator(),
      isCompleted: false,
      category: category ? category : null,
    };
    if (taskName.trim() !== '') {
      addTask(newTask);
      onCloseModal();
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1300);
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal visible={isModalOpen} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View style={styles.container}>
          <View style={[styles.modalStyle]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.headerButtons}
                activeOpacity={0.6}
                onPress={onCloseModal}
              >
                <EvilIcons name="close" size={33} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.saveButton}
                activeOpacity={0.6}
              >
                <Text style={{ color: '#FFF' }}>Guardar</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.headerButtons} activeOpacity={0.6}>
              <SimpleLineIcons name="pencil" size={23} color="#000" />
            </TouchableOpacity> */}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textOption}>Tarea</Text>
              <TextInput
                onChangeText={handleInputChange}
                placeholder="Describe tu tarea"
                style={[styles.input, error && { borderColor: 'red' }]}
              />
            </View>
            <View style={styles.options}>
              <Text style={styles.textOption}>Notificar</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotification}
                value={notification}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.options}>
              <Text style={styles.textOption}>Todo el día</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleAllDay}
                value={allDay}
              />
            </View>

            {!allDay && (
              <>
                <View style={styles.divider} />
                <View style={styles.options}>
                  <Text style={styles.textOption}>Hora de inicio</Text>

                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || startTime;
                      setStartTime(currentDate);
                      setEndTime(currentDate);
                    }}
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.options}>
                  <Text style={styles.textOption}>Hora de fin</Text>
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || endTime;
                      setEndTime(currentDate);
                    }}
                  />
                </View>
              </>
            )}
            <View style={styles.divider} />
            <DropdownComponent setCategory={setCategory} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalStyle: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    height: '85%',
    backgroundColor: '#f3eee6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#808B96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 85,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 22,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  textOption: {
    fontWeight: '500',
    color: '#454545',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D5D8DC',
    marginVertical: 10,
  },
});
