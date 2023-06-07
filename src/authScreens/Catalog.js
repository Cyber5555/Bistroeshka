import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "../../components/fixedElements/Wrapper";
import { ActivityIndicator, FlatList, Keyboard, RefreshControl, StyleSheet, Text, View } from "react-native";
import { CatalogRenders } from "../../components/catalogRenders/catalogRenders";
import { SearchInput } from "../../components/inputs/searchInput";
import { SubCategory } from "../../components/catalogRenders/subCategory";
import { FilterBox } from "../../components/filterBox/filterBox";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../store/authReducer/getCategorySlice";
import { clearPagination, getAllProductRequest } from "../../store/authReducer/getAllProductSlice";
import { TextColor } from "../../components/colors/colors";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice";

export default Catalog = () => {
  const [active, setActive] = useState(0);
  const [open_filter, setOpenFilter] = useState(false);
  const [add_remove_beg, setAddBeg] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { category_data, loading_category } = state.getCategorySlice;
  const {
    all_product_data,
    current_page,
    loading,
    stop_paginate,
  } = state.getAllProductSlice;
  const { success_favorite } = state.addFavoriteSlice;
  const [item_id, setItemId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedFavorite, setSelectFavorite] = useState([]);
  const [selectedBasket, setSelectBasket] = useState([]);
  const [price_min, setPriceMin] = useState("");
  const [price_max, setPriceMax] = useState("");
  const [show_category, setShowCategory] = useState(true);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(true);

  useEffect(() => {
    const isFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("userToken").then(userToken => {
        setToken(userToken);
        dispatch(getCategoryRequest({})).then(async res => {
          await dispatch(clearPagination());
          if (res.payload.status) {
            setItemId(res.payload.category[0].id);
            setActive(res.payload.category[0].id);
            dispatch(
              getAllProductRequest({
                search: search,
                min_price: price_min,
                max_price: price_max,
                category_id: res.payload.category[0].id,
                page: 1,
                token: token,
              }),
            );
          }
        });
      }).catch(() => {
        setToken(null);
      });
    });

    return () => {
      return isFocus();
    };
  }, [navigation, dispatch]);

  useEffect(() => {

    AsyncStorage.getItem("userToken").then(userToken => {
      setToken(userToken);
    }).catch(() => {
      setToken(null);
    });
  }, [loading_category]);

  const handleLoadMore = () => {
    if (!stop_paginate && !loading) {
      if (item_id != null && item_id != undefined) {
        dispatch(
          getAllProductRequest({
            search: search,
            min_price: price_min,
            max_price: price_max,
            category_id: item_id,
            page: current_page,
            token: token,
          }),
        );
      }
      return false;
    }
  };

  useEffect(() => {
    callBackFunction();
  }, [category_data, loading_category, all_product_data, current_page]);

  const callBackFunction = () => {
    if (token) {
      let favorite = [];
      let basket = [];
      all_product_data.filter((item, index) => {
        if (
          item?.has_favorite?.length > 0 &&
          item?.has_favorite[0]?.product_id != undefined
        ) {
          favorite.push(Number(item?.has_favorite[0]?.product_id));
        }

        if (
          item?.has_bascet?.length > 0 &&
          item?.has_bascet[0]?.product_id != undefined
        ) {
          basket.push(Number(item?.has_bascet[0]?.product_id));
        }
      });
      setSelectFavorite(favorite);
      setSelectBasket(basket);
    }
  };

  const onRefresh = useCallback(() => {
    dispatch(clearPagination());
    if (!loading && refresh) {
      dispatch(
        getAllProductRequest({
          search: search,
          min_price: price_min,
          max_price: price_max,
          category_id: item_id,
          page: 1,
          token: token,
        }),
      );
    }
  }, []);

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


  const renderCategoryItem = ({ item, index }) => {
    return (
      <SubCategory
        text={item.title}
        index={item.id}
        isActive={e => {
          dispatch(clearPagination());
          setItemId(item.id);
          setActive(item.id);
          dispatch(
            getAllProductRequest({
              search: search,
              min_price: price_min,
              max_price: price_max,
              category_id: item.id,
              page: 1,
              token: token,
            }),
          );
        }}
        key={index}
        active={active}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <CatalogRenders
        add_remove_beg={selectedBasket.indexOf(item.id) > -1 ? true : false}
        add_remove_favorite={
          selectedFavorite.indexOf(item.id) > -1 ? true : false
        }
        addBeg={() => {
          if (token) {
            toggleBasket(item, index);
          } else {
            navigation.navigate("LoginOrRegister");
          }
        }}
        addFavorite={() => {
          if (token) {
            toggleFavorite(item, index);
          } else {
            navigation.navigate("LoginOrRegister");
          }
        }}
        navigation={() => {
          navigation.navigate("SinglePage", {
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
      title={"Каталог"}
      leftIcon={false}
      rightIcon={true}
      openFilter={() => {
        setOpenFilter(true);
        setItemId("");
      }}>
      <FilterBox
        isOpen={open_filter}
        category={category_data}
        maxPrice={price_max}
        minPrice={price_min}
        setMaxPrice={e => setPriceMax(e)}
        setMinPrice={e => setPriceMin(e)}
        setOpen={() => setOpenFilter(false)}
        changeCategory={e => setItemId(e)}
        itemId={item_id}
        filter={() => {
          dispatch(clearPagination());
          setShowCategory(false);
          setSearched(true);
          dispatch(
            getAllProductRequest({
              search: search,
              min_price: price_min,
              max_price: price_max,
              category_id: item_id,
              page: 1,
              token: token,
            }),
          );
        }}
        clear={() => {
          setItemId("");
          dispatch(clearPagination());
          setPriceMax("");
          setPriceMin("");
          setShowCategory(true);
          setSearched(true);
          dispatch(
            getAllProductRequest({
              search: search,
              min_price: "",
              max_price: "",
              category_id: category_data[0]?.id,
              page: 1,
              token: token,
            }),
          );
        }}
      />
      <SearchInput
        value={search}
        setValue={e => {
          setSearch(e);
          if (e == "") {
            dispatch(clearPagination());
            setShowCategory(true);
            setSearched(true);
            dispatch(
              getAllProductRequest({
                search: "",
                min_price: price_min,
                max_price: price_max,
                category_id: "",
                page: 1,
                token: token,
              }),
            );
          } else {
            setShowCategory(false);
            setSearched(true);
          }
        }}
        searched={searched}
        search={() => {
          dispatch(clearPagination());
          Keyboard.dismiss();
          if (searched && search) {
            setShowCategory(false);
            setSearched(false);
            dispatch(
              getAllProductRequest({
                search: search,
                min_price: price_min,
                max_price: price_max,
                category_id: "",
                page: 1,
                token: token,
              }),
            );
          } else if (!searched && search) {
            setSearch("");
            setShowCategory(true);
            setSearched(true);
            dispatch(
              getAllProductRequest({
                search: "",
                min_price: price_min,
                max_price: price_max,
                category_id: "",
                page: 1,
                token: token,
              }),
            );
          }
        }}
      />
      <View style={styles.subCategoryParent}>
        <FlatList
          data={show_category ? category_data : []}
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
    textAlign: "center",
    color: TextColor,
  },
});
