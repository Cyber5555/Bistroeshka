import React, {useEffect, useState} from 'react';
import Wrapper from './../../components/fixedElements/Wrapper';
import {
  Dimensions,
  FlatList,
  RefreshControl,
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
  const {success_count_change} = state.plusMinusBasketSlice;
  const {all_count, all_price} = state.getBasketPriceCountSlice;
  const [token, setToken] = useState(null);
  const [new_all_count, setAllCount] = useState(0);
  const [new_all_price, setAllPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState();
  const [allData, setAllData] = useState([]);

  function getChangedProductsPrice(type, price,id) {
    let myCount = count;
    let mySum = sum;
    let items = [...allData]
    let i = items.findIndex((el) =>  el.product_id == id)
    console.log(i);


    if (type == '+') {
      myCount = myCount + 1;
      mySum += +price;
      items[i].product_count =  +items[i].product_count + 1
    } else if (type == '-') {
      myCount = myCount - 1;
      mySum -= +price;
      items[i].product_count = +items[i].product_count - 1

    }
    setCount(myCount);
    setSum(mySum);
    setAllData(items)
  }

  function getProductsPrice() {
    let sum = 0;
    let count = 0;
    all_basket.forEach(el => {
      console.log(el.product_count)
      sum += el.product_count * el.basket_product.price;
      count += +el.product_count;
    });
    setCount(count);
    setSum(sum);
  }

  function deleteProductfromBasket(productCount, productPrice, index) {
    console.log(index)
    let myCount = count;
    let mySum = sum;
    myCount = myCount - productCount;
    mySum = mySum -(productCount * productPrice);
    setCount(myCount);
    setSum(mySum);
    let myData = [...allData];
    myData.splice(index, 1);
    setAllData(myData);
  }

  useEffect(() => {
    // if(all_basket.length){
      setAllData(all_basket);
      getProductsPrice();
    // }
  }, [all_basket]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(getAllBasketRequest({})).then(res => {
        if (res.payload.status) {
          // getProductsPrice()
          AsyncStorage.getItem('userToken').then(userToken => {
            setToken(userToken);
            // dispatch(getBasketPriceCountRequest(userToken));
            // dispatch(getBasketPriceCountRequest(userToken)).then(res => {
            //   setAllCount(res.payload.all_count);
            //   setAllPrice(res.payload.all_price);
            // });
          });
        }
      });
    });
    // AsyncStorage.getItem("userToken").then(userToken => {
    //   setToken(userToken);
    //   dispatch(getBasketPriceCountRequest(userToken));
    // });
    return () => {
      return focus();
    };
  }, [navigation]);

  useEffect(() => {
    setAllCount(all_count);
    setAllPrice(all_price);
  }, [success_count_change]);

  const renderItem = ({item, index}) => {
    return <BegRenderedItems
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
      getProductsPrice={getChangedProductsPrice}
      delate={(e) => {
        dispatch(delateInBassketRequest(item.product_id));
        deleteProductfromBasket(
          item?.product_count,
          item?.basket_product?.price,
          index,
        );
      }}
    />
    };

  return (
    <Wrapper
      leftIcon={false}
      rightIcon={false}
      title={'Корзина'}
      bottomLine={true}
      navigation={() => navigation.goBack()}>
      <FlatList
        data={allData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        refreshing={loading}
        refreshControl={<RefreshControl refreshing={loading} />}
        ListFooterComponent={() =>
          allData.length ? (
            <BigButton
              buttonStyle={{margin: 40}}
              buttonText={'Оформить заказ'}
              navigation={() => {
                dispatch(buyProductsRequest({})).then(res => {
                  if (res.payload?.status) {
                    // dispatch(getBasketPriceCountRequest(token));
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
        <Text style={styles.productCount}>Количество: {count} шт.</Text>
        <View style={styles.priceParent}>
          <Text style={styles.priceText}>Товаров на</Text>
          <Text style={styles.price}>{sum} Р</Text>
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
