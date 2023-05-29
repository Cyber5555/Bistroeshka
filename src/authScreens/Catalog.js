import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Wrapper from '../../components/fixedElements/Wrapper';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CatalogRenders} from '../../components/catalogRenders/catalogRenders';
import {SearchInput} from '../../components/inputs/searchInput';
import {SubCategory} from '../../components/catalogRenders/subCategory';
import FilterBox from '../../components/filterBox/filterBox';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryRequest} from '../../store/authReducer/getCategorySlice';
import {
  clearPagination,
  getAllProductRequest,
} from '../../store/authReducer/getAllProductSlice';
import {TextColor} from '../../components/colors/colors';
import {store} from '../../store';
import {addFavoriteRequest} from '../../store/authReducer/addFavoriteSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addBasketRequest} from '../../store/authReducer/addBasketSlice';

export default Catalog = () => {
  const [active, setActive] = useState(0);
  const [open_filter, setOpenFilter] = useState(false);
  const [add_remove_beg, setAddBeg] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {category_data, first_id, loading_category} = state.getCategorySlice;
  const {all_product_data, current_page, loading, stop_paginate} =
    state.getAllProductSlice;
  const {success_favorite} = state.addFavoriteSlice;
  const [item_id, setItemId] = useState(first_id ? first_id : null);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedFavorite, setSelectFavorite] = useState([]);
  const [selectedBasket, setSelectBasket] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
    });
    const isFocus = navigation.addListener('focus', async () => {
      await dispatch(clearPagination());
      await dispatch(getCategoryRequest({}));
    });

    return isFocus;
  }, [navigation]);

  useEffect(() => {
    setItemId(first_id);
    setActive(0);
  }, [loading_category, first_id]);

  useEffect(() => {
    dispatch(getAllProductRequest({id: item_id, page: current_page}));
  }, [item_id]);

  const handleLoadMore = () => {
    if (!stop_paginate && !loading) {
      changeCategory(item_id);
      return false;
    }
  };

  useEffect(() => {
    callBackFunction();
  }, [
    category_data,
    first_id,
    loading_category,
    all_product_data,
    current_page,
  ]);

  const callBackFunction = () => {
    let favorite = [];
    let basket = [];
    all_product_data.filter((item, index) => {
      if (
        item?.has_favorite[0]?.product_id != undefined &&
        item?.has_favorite?.length > 0
      ) {
        favorite.push(Number(item?.has_favorite[0]?.product_id));
      }

      if (
        item?.has_bascet[0]?.product_id != undefined &&
        item?.has_bascet?.length > 0
      ) {
        basket.push(Number(item?.has_bascet[0]?.product_id));
      }
    });
    setSelectFavorite(favorite);
    setSelectBasket(basket);
  };

  const onRefresh = useCallback(() => {
    dispatch(clearPagination());
    if (!loading && refresh) {
      dispatch(getAllProductRequest({id: item_id, page: current_page}));
    }
  }, []);

  const changeCategory = id => {
    if (item_id != null && item_id != undefined) {
      dispatch(getAllProductRequest({id: id, page: current_page}));
    }
  };

  const toggleFavorite = (item, index) => {
    dispatch(addFavoriteRequest(item.id));
    if (selectedFavorite.indexOf(item.id) > -1) {
      let newArray = selectedFavorite.filter(indexObject => {
        if (indexObject == item.id) {
          return false;
        }
        return true;
      });
      setSelectFavorite(newArray);
    } else {
      setSelectFavorite([...selectedFavorite, item.id]);
    }
  };
  const toggleBasket = (item, index) => {
    dispatch(addBasketRequest(item.id));
    if (selectedBasket.indexOf(item.id) > -1) {
      let newArray = selectedBasket.filter(indexObject => {
        if (indexObject == item.id) {
          return false;
        }
        return true;
      });
      setSelectBasket(newArray);
    } else {
      setSelectBasket([...selectedBasket, item.id]);
    }
  };
  // has_bascet

  const renderCategoryItem = ({item, index}) => {
    return (
      <SubCategory
        text={item.title}
        index={index}
        isActive={async e => {
          await dispatch(clearPagination());
          await setItemId(item.id);
          await changeCategory(item.id);
          setActive(index);
        }}
        key={index}
        active={active}
      />
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <CatalogRenders
        add_remove_beg={selectedBasket.indexOf(item.id) > -1 ? true : false}
        add_remove_favorite={
          selectedFavorite.indexOf(item.id) > -1 ? true : false
        }
        addBeg={() => toggleBasket(item, index)}
        addFavorite={() => toggleFavorite(item, index)}
        navigation={() => {
          navigation.navigate('SinglePage', {
            parameter: item.id,
          });
        }}
        image={item?.get_product_image[0]?.image}
        title={item?.title}
        price={item?.price}
        gram={item?.dimension}
        info={item?.description}
      />
    );
    // }
  };

  return (
    <Wrapper
      title={'Каталог'}
      leftIcon={false}
      rightIcon={true}
      openFilter={() => setOpenFilter(true)}>
      <FilterBox isOpen={open_filter} setOpen={() => setOpenFilter(false)} />
      <SearchInput />
      <View style={styles.subCategoryParent}>
        <FlatList
          data={category_data}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
        />
      </View>

      <FlatList
        data={all_product_data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size={50} /> : null}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => {
          if (!loading && !refresh) {
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
  subCategoryParent: {
    marginTop: 20,
    marginBottom: 15,
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
