import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const idGenerator = () => {
  const uniqueId = uuidv4();

  return uniqueId
};
