import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Task } from './Task';
import { useTodoStore } from '../../store/store';

export const TaskList = () => {
  const { tasks } = useTodoStore();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]}>
          <Text style={{ color: '#fff', fontSize: 20 }}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#fff' }]}>
          <Text style={{ color: '#000', fontSize: 20 }}>Historial</Text>
        </TouchableOpacity>
      </View>
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>¡Vaya!</Text>
          <Text style={styles.emptyText}>parece que no tienes</Text>
          <Text style={styles.emptyText}>tareas pendientes</Text>
          <Image
            style={styles.emptyImage}
            source={require('../../../assets/check.png')}
          />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Task key={item.id} task={item} />}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3eee6',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: 180,
    height: 55,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#454545'
  },
  emptyImage: {
    width: 300,
    height: 300,
    top: -40,
  },
});
