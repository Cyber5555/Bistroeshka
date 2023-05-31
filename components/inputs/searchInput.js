import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {TextColor} from '../colors/colors';
import {SearchIcon, CloseSearch} from '../icons/includeSvg';

export const SearchInput = ({value, setValue, search, searched}) => {
  return (
    <View style={styles.parent}>
      <TextInput
        style={styles.input}
        placeholder="Поиск..."
        placeholderTextColor={TextColor}
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={styles.searchButton} onPress={search}>
        {searched ? <SearchIcon /> : <CloseSearch />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    color: TextColor,
    fontSize: 15,
    paddingLeft: 15,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    height: '100%',
  },
});
