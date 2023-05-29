import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AddBegIcon, RemoveBegIcon} from '../icons/includeSvg';

export const AddToBegButton = ({checked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {checked ? <RemoveBegIcon /> : <AddBegIcon />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#662916',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
  },
});
