import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextColor} from '../colors/colors';
import {DelateToBeg} from '../icons/includeSvg';

export const ShopHistoryRenderedItems = ({
  image,
  title,
  price,
  gram,
  info,
  navigation,
  dateTime,
}) => {
  const [count, setCount] = useState(0);
  return (
    <TouchableOpacity style={styles.parent} onPress={navigation}>
      <Image source={image} style={styles.image} />
      <View style={styles.boxesParent}>
        <View style={styles.priceNameParent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.priceGramParent}>
            <Text style={styles.title}>{price} Р</Text>
            <Text style={styles.gram}>{gram}г</Text>
          </View>
        </View>
        <Text numberOfLines={3} style={styles.info}>
          {info}
        </Text>
        <View style={styles.buttonParent}>
          <Text style={styles.dateTime}>{dateTime}</Text>
          <TouchableOpacity>
            <DelateToBeg />
          </TouchableOpacity>
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
    marginVertical: 12,
  },
  image: {
    width: '30%',
    height: '100%',
  },
  boxesParent: {
    width: '67%',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  dateTime: {
    fontFamily: 'Montserrat-Regular',
    color: '#545454',
  },
});
