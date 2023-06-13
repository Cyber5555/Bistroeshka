import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from './../../components/fixedElements/Wrapper';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FavoriteRenders} from '../../components/favoriteRenders/favoriteRenders';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFavoritesRequest} from '../../store/authReducer/getAllFavoritesSlice';
import {API_URL} from '@env';
import {addFavoriteRequest} from '../../store/authReducer/addFavoriteSlice';
import {
  clearPagination,
  getAllProductRequest,
} from '../../store/authReducer/getAllProductSlice';
import {TextColor} from '../../components/colors/colors';
import LoginOrRegister from '../notAuthScreens/LoginOrRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Favorites = () => {
  // const [add_remove_beg, setAddBeg] = useState();
  const state = useSelector(state => state);
  const {all_favorites} = state.getAllFavoritesSlice;
  const {success_favorite, loading} = state.addFavoriteSlice;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(false);
  const [allData,setAllData] = useState([])
  useEffect(() => {
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
    });
    const isFocuse = navigation.addListener('focus', () => {
      dispatch(getAllFavoritesRequest({}));
    });

    return isFocuse;
  }, [navigation]);

  useEffect(() => {
    dispatch(getAllFavoritesRequest({}));
  }, [success_favorite, all_favorites, refresh]);

  useEffect(() => {
    setAllData(all_favorites)
  }, [all_favorites])

  const onRefresh = useCallback(() => {
    dispatch(clearPagination());
    if (!loading && refresh) {
      dispatch(getAllFavoritesRequest({}));
    }
  }, []);
  const deleteProduct = (index) =>{
    let item = [...allData]
    item.splice(index,1)
    setAllData(item)
  }
  const renderItem = ({item, index}) => {
    return (
      <FavoriteRenders
        image={{
          uri: `${API_URL}/uploads/${item?.get_product?.get_product_image[0]?.image}`,
        }}
        title={item?.get_product?.title}
        price={item?.get_product?.price}
        gram={item?.get_product?.dimension}
        info={item?.get_product?.description}
        navigation={() =>
          navigation.navigate('SinglePage', {
            parameter: item?.get_product?.id,
          })
        }
        onPress={() => {
          deleteProduct(index)
          if (token) {
            dispatch(addFavoriteRequest(item?.get_product?.id));
          } else {
            navigation.navigate('LoginOrRegister');
          }
        }}
      />
    );
  };

  return (
    <Wrapper
      leftIcon={false}
      rightIcon={false}
      title={'Избранные'}
      bottomLine={true}
      goBack={() => navigation.goBack()}>
      <FlatList
        data={allData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        // ListFooterComponent={loading ? <ActivityIndicator size={50} /> : null}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => {
          if (allData.length == 0 && !refresh) {
            return (
              <View style={styles.emptyParent}>
                <Text style={styles.emptyText}>Нет продуктов</Text>
              </View>
            );
          }
        }}
      />
    </Wrapper>
  );
};
const styles = StyleSheet.create({
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
