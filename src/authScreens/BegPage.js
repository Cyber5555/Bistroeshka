import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from './../../components/fixedElements/Wrapper';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BegRenderedItems} from '../../components/begRenderedItems/begRenderedItems';
import {BigButton} from './../../components/buttons/bigButton';
import SuccessModal from './../../components/modals/successModal';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBasketRequest} from '../../store/authReducer/getAllBasketSlice';
import {TextColor} from '../../components/colors/colors';
import {delateInBassketRequest} from '../../store/authReducer/delateInBassketSlice';
import {addFavoriteRequest} from '../../store/authReducer/addFavoriteSlice';
import {getBasketPriceCountRequest} from '../../store/authReducer/getBasketPriceCountSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {buyProductsRequest} from '../../store/authReducer/buyProductsSlice';

const {width} = Dimensions.get('window');

export default BegPage = ({}) => {
  const [modal_visible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state1 => state1);
  const {all_basket, loading} = state.getAllBasketSlice;
  const {success_delate} = state.delateInBassketSlice;
  const {success_count_change} = state.plusMinusBasketSlice;
  const {all_count, all_price} = state.getBasketPriceCountSlice;
  const {success_login} = state.loginSlice;
  const {success_logout} = state.logoutSlice;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(getAllBasketRequest({}));
    });
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
      dispatch(getBasketPriceCountRequest(userToken));
    });
    return () => {
      return focus();
    };
  }, [navigation, success_logout, success_login]);

  useEffect(() => {
    if (success_delate) dispatch(getAllBasketRequest({}));
  }, [success_delate]);

  // useEffect(() => {
  //   if (success_count_change);
  // }, [success_count_change]);

  const renderItem = ({item, index}) => (
    <BegRenderedItems
      navigation={() =>
        navigation.navigate('SinglePage', {
          parameter: item.product_id,
        })
      }
      image={item?.basket_product?.get_product_image[0]?.image}
      title={item?.basket_product?.title}
      price={item?.basket_product?.price}
      gram={item?.basket_product?.dimension}
      info={item?.basket_product?.description}
      product_count={item?.product_count}
      product_id={item.product_id}
      token={token}
      delate={() => {
        dispatch(delateInBassketRequest(item.product_id));
      }}
    />
  );

  return (
    <Wrapper
      leftIcon={false}
      rightIcon={false}
      title={'Корзина'}
      bottomLine={true}
      navigation={() => navigation.goBack()}>
      <FlatList
        data={all_basket}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() =>
          all_basket.length ? (
            <BigButton
              buttonStyle={{margin: 40}}
              buttonText={'Оформить заказ'}
              navigation={() => {
                dispatch(buyProductsRequest({})).then(res => {
                  // console.log(res.payload);
                  if (res.payload?.status) {
                    dispatch(getBasketPriceCountRequest(token));
                    setModalVisible(true);
                  }
                });
              }}
            />
          ) : null
        }
        ListEmptyComponent={() => {
          if (!loading) {
            return (
              <View style={styles.emptyParent}>
                <Text style={styles.emptyText}>Нет продуктов</Text>
              </View>
            );
          }
        }}
      />
      <View style={styles.bottomBarInfo}>
        <Text style={styles.productCount}>Количество: {all_count} шт.</Text>
        <View style={styles.priceParent}>
          <Text style={styles.priceText}>Товаров на</Text>
          <Text style={styles.price}>{all_price} Р</Text>
        </View>
      </View>
      <SuccessModal
        press={() => {
          navigation.navigate('Catalog');
          setModalVisible(false);
        }}
        visible={modal_visible}
        successText={'Заказ успешно принят'}
        buttonText={'В Каталог'}
      />
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  bottomBarInfo: {
    width: width,
    marginLeft: -20,
    borderTopWidth: 2,
    borderTopColor: '#F7F7F7',
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  productCount: {
    fontFamily: 'Montserrat-Medium',
    color: '#662916',
    fontSize: 12,
  },
  priceParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  priceText: {
    color: '#662916',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  price: {
    color: '#662916',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  emptyParent: {
    flex: 1,
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    color: TextColor,
  },
});
