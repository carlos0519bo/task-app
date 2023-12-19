import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';

interface Props {
  date: moment.Moment;
  onSelectDate: (date: string) => void;
  selected: string | null;
}

moment.locale('es');

export const Date = ({ date, onSelectDate, selected }: Props) => {
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Hoy'
      : moment(date).format('ddd').replace(/\.$/, '');

  const dayNumber = moment(date).format('D');

  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity onPress={() => onSelectDate(fullDate)} style={{height:50, alignItems: 'center'}}>
      <Text
        style={[
          styles.dayText,
          selected === fullDate && { textAlign: 'center' },
        ]}
      >
        {day}
      </Text>
      <View
        style={[
          styles.dayContainer,
          selected === fullDate && styles.selectedDay,
        ]}
      >
        <Text
          style={[
            styles.medium,
            selected === fullDate && {
              color: '#000',
              fontWeight: 'bold',
              fontSize: 20,
            },
          ]}
        >
          {dayNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
    width: 50,
    height: 50,
  },
  selectedDay: {
    backgroundColor: '#fafafacd',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  medium: {
    fontSize: 18,
    color: '#fafafacd',
    fontWeight: '600'
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fafafacd',
  },
});
