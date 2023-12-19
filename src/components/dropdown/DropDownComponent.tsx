import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { categories, Categories } from '../../utils';

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<Categories | null>>;
}

export const DropdownComponent = ({ setCategory }: Props) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={categories}
      maxHeight={250}
      labelField="label"
      valueField="value"
      placeholder="Seleccione categoria"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        setCategory(item);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
