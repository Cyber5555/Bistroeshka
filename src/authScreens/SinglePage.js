import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "./../../components/fixedElements/Wrapper";
import Slider from "../../components/slider/slider";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextColor } from "../../components/colors/colors";
import { LikedProduct, NoLikedProduct } from "../../components/icons/includeSvg";
import { ChangeCount } from "../../components/buttons/changeCount";
import { SmallButton } from "./../../components/buttons/smallButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductSingleRequest } from "../../store/authReducer/getProductSingleSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice";
import { plusMinusBasketRequest } from "../../store/authReducer/plusMinusBasketSlice";

export default SinglePage = ({ route }) => {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const state = useSelector(state => state);
  const { single_product_data, loading } = state.getProductSingleSlice;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState();

  useEffect(
    useCallback(() => {
      AsyncStorage.getItem("userToken").then(userToken => {
        setToken(userToken);
      });

      const unsubscribe = navigation.addListener("focus", () => {
        dispatch(getProductSingleRequest({ id: route.params.parameter }));
      });

      return unsubscribe;
    }, [route?.params?.parameter, navigation]),
  );

  useEffect(() => {
    setIsLiked(single_product_data?.has_favorite?.length ? true : false);
  }, [route?.params?.parameter, single_product_data]);

  return (
    <Wrapper
      leftIcon={true}
      title={single_product_data?.title}
      styleProps={{ marginBottom: 10 }}
      goBack={() => navigation.goBack()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() =>
              dispatch(getProductSingleRequest({ id: route.params.parameter }))
            }
          />
        }>
        {single_product_data?.get_product_image?.length > 0 && (
          <Slider data={single_product_data?.get_product_image} />
        )}

        <View style={styles.productTypeParent}>
          <View>
            <Text style={styles.productType}>
              {single_product_data?.get_category?.title}
            </Text>
            <Text style={styles.productName}>{single_product_data?.title}</Text>
            <View style={styles.gramPrice}>
              <Text style={styles.price}>{single_product_data?.price} ₽</Text>
              <Text style={styles.gram}>{single_product_data?.dimension}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (token) {
                dispatch(addFavoriteRequest(single_product_data.id));
                setIsLiked(!isLiked);
              } else {
                navigation.navigate("LoginOrRegister");
              }
            }}>
            {isLiked ? <LikedProduct /> : <NoLikedProduct />}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonParent}>
          <ChangeCount
            height={45}
            width={"49%"}
            count={count}
            // setCountPlus={() => setCount(count + 1)}
            // setCountMinus={() => count > 0 && setCount(count - 1)}

            setCountPlus={() => {
              dispatch(
                plusMinusBasketRequest({
                  mat_method: "+",
                  product_id: route.params.parameter,
                }),
              );
              //   .then(res => {
              //   if (res.payload?.status)
              //     dispatch(getBasketPriceCountRequest(token));
              // });
              setCount(count + 1);
            }}
            setCountMinus={() => {
              if (token) {
                if (count > 1) {
                  setCount(count - 1);
                  dispatch(
                    plusMinusBasketRequest({
                      mat_method: "-",
                      product_id: route.params.parameter,
                    }),
                  );
                  //   .then(res => {
                  //   if (res.payload?.status)
                  //     dispatch(getBasketPriceCountRequest(token));
                  // });
                }
                // else {
                //   dispatch(delateInBassketRequest(product_id));
                // }
              } else {
                count > 0 && setCount(count - 1);
              }
            }}
          />
          <SmallButton buttonText={"В корзину"} navigation={() => {
            if (token) {
              dispatch(addBasketRequest(route.params.parameter));
            } else {
              navigation.navigate("LoginOrRegister");
            }
          }} />
        </View>
        <Text style={styles.information}>
          {single_product_data?.description}
        </Text>
        <Text style={styles.compound}>Состав:</Text>
        <Text style={styles.compoundItems}>
          {single_product_data?.compound}
        </Text>
      </ScrollView>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  productTypeParent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productType: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#868686",
    marginBottom: 4,
  },
  productName: {
    fontFamily: "Montserrat-SemiBold",
    color: TextColor,
    fontSize: 18,
    marginBottom: 5,
  },
  gramPrice: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  price: {
    color: TextColor,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
  },
  gram: {
    color: "#868686",
    fontSize: 13,
  },
  buttonParent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  information: {
    fontFamily: "OpenSans-Regular",
    color: "#868686",
    marginTop: 20,
    fontSize: 14,
  },
  compound: {
    color: TextColor,
    marginTop: 10,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  },
  compoundItems: {
    color: "#868686",
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
  },
});
