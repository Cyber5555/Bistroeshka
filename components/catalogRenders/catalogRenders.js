import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextColor} from '../colors/colors';
import {AddToBegButton} from '../buttons/addToBegButton';
import {AddToFavoriteButton} from '../buttons/addToFavoriteButton';
import {API_URL} from '@env';

export const CatalogRenders = ({
  image,
  title,
  price,
  gram,
  info,
  navigation,
  add_remove_beg,
  add_remove_favorite,
  addBeg,
  addFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.parent} onPress={navigation}>
      <Image
        source={{uri: `${API_URL}/uploads/` + image}}
        style={styles.image}
      />
      <View style={styles.boxesParent}>
        <View style={styles.priceNameParent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.priceGramParent}>
            <Text style={styles.title}>{price} Р</Text>
            <Text style={styles.gram}>{gram}</Text>
          </View>
        </View>
        <Text numberOfLines={3} style={styles.info}>
          {info}
        </Text>
        <View style={styles.buttonParent}>
          <AddToBegButton checked={add_remove_beg} onPress={addBeg} />
          <AddToFavoriteButton
            checked={add_remove_favorite}
            onPress={addFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  parent: {
    width: '100%',
    flexDirection: 'row',
    columnGap: 10,
    marginBottom: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  boxesParent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  priceNameParent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: TextColor,
    fontSize: 14,
  },
  priceGramParent: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'OpenSans-SemiBold',
    color: TextColor,
    fontSize: 13,
  },
  gram: {
    fontSize: 13,
    color: '#868686',
    fontFamily: 'OpenSans-Regular',
  },
  info: {
    color: '#545454',
    fontSize: 14,
    marginVertical: 2,
  },
  buttonParent: {
    width: '100%',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 5,
  },
});
