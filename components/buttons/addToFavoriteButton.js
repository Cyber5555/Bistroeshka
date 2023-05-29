import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AddFavoriteIcon, RemoveFavoriteIcon} from '../icons/includeSvg';

export const AddToFavoriteButton = ({checked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {checked ? <RemoveFavoriteIcon /> : <AddFavoriteIcon />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#F9DEC1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
