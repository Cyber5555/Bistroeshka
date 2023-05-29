import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextColor} from '../colors/colors';
import {LikedProduct, NoLikedProduct} from '../icons/includeSvg';
import {addFavoriteRequest} from '../../store/authReducer/addFavoriteSlice';

export const FavoriteRenders = ({
  image,
  title,
  price,
  gram,
  info,
  navigation,
  onPress,
}) => {
  const [isLiked, setIsLiked] = useState(true);

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
        <View style={styles.buttonParent}>
          <Text numberOfLines={3} style={styles.info}>
            {info}
          </Text>
          <TouchableOpacity onPress={onPress}>
            {isLiked ? <LikedProduct /> : <NoLikedProduct />}
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
    // height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    width: '78%',
  },
  buttonParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
