import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextColor} from '../colors/colors';
import {ChangeCount} from './../buttons/changeCount';
import {DelateToBeg} from '../icons/includeSvg';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';
import {delateInBassketRequest} from '../../store/authReducer/delateInBassketSlice';
import {plusMinusBasketRequest} from '../../store/authReducer/plusMinusBasketSlice';
import {getBasketPriceCountRequest} from '../../store/authReducer/getBasketPriceCountSlice';

export const BegRenderedItems = ({
  image,
  title,
  price,
  gram,
  info,
  navigation,
  product_count,
  delate,
  setCountMinus,
  setCountPlus,
  product_id,
  token,
  getProductsPrice,
}) => {
  const [count, setCount] = useState(Number(product_count));
  useEffect(()=>{
    setCount(Number(product_count))
    console.log(product_count,'product_count')
  },[product_count])
  const dispatch = useDispatch();
  return (
    <TouchableOpacity style={styles.parent} onPress={navigation}>
      <Image
        source={{uri: `${API_URL}/uploads/${image}`}}
        style={styles.image}
      />
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
          <ChangeCount
            height={30}
            width={'80%'}
            count={count}
            setCountPlus={() => {
              dispatch(
                plusMinusBasketRequest({
                  mat_method: '+',
                  product_id: product_id,
                }),
              )
              setCount(count + 1);
              getProductsPrice('+', price, product_id);
            }}
            setCountMinus={() => {
              if (count > 1) {
                setCount(count - 1);
                dispatch(
                  plusMinusBasketRequest({
                    mat_method: '-',
                    product_id: product_id,
                  }),
                  getProductsPrice('-', price,product_id),
                )
              } else {
                dispatch(delateInBassketRequest(product_id));
              }
            }}
          />
          <TouchableOpacity onPress={()=>delate(count)}>
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
  },
  buttonParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: 5,
  },
});
