import Wrapper from './../../components/fixedElements/Wrapper';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EditInput from '../../components/inputs/editInput';
import {BigButton} from './../../components/buttons/bigButton';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAddressRequest} from '../../store/authReducer/getAllAddressSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextColor} from '../../components/colors/colors';
import {addNewAddressRequest} from '../../store/authReducer/addNewAddressSlice';
import {delateAddressRequest} from '../../store/authReducer/delateAddressSlice';

const {width} = Dimensions.get('window');

export default EditAddress = ({}) => {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');

  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {all_address_data, loading} = state.getAllAddressSlice;
  const [address_list, setAddressList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
      dispatch(getAllAddressRequest(userToken)).then(res => {
        if (res.payload.status) {
          setAddressList(res.payload.data);
        }
      });
    });
  }, [navigation, dispatch]);

  const addNewInput = productId => {
    // setAddressList(prevState => [...prevState, {address: '', id: id + 1}]);

    setAddressList(prevState => [
      ...prevState,
      {
        address: '',
        edit_address: false,
      },
    ]);
  };

  const removeInput = item => {
    if (address_list.indexOf(item) > -1) {
      let newArray = address_list.filter(indexObject => {
        if (indexObject == item) {
          dispatch(
            delateAddressRequest({
              address: item.address,
              address_id: item.id,
            }),
          ).then(res => {
            if (res.payload?.status) dispatch(getAllAddressRequest(token));
          });
          return false;
        }
        return true;
      });
      setAddressList(newArray);
    } else {
      setAddressList([...address_list, item]);
    }
  };

  const toggleEdit = productId => {
    setAddressList(prevProducts =>
      prevProducts.map((product, index) => {
        return index === productId
          ? {...product, edit_address: !product.edit_address}
          : product;
      }),
    );
  };

  const handleInputChange = (id, text) => {
    setAddressList(prevInputs =>
      prevInputs.map((input, ind) =>
        ind === id ? {...input, address: text} : input,
      ),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <EditInput
        keyboardType={'default'}
        isVerify={item?.edit_address}
        edit={!item?.edit_address}
        arrowRight={false}
        placeholder={'г. Москва ул. Внукого д.24 кв. 12'}
        editable={item?.edit_address}
        delate={true}
        delateButton={() => removeInput(item)}
        propsStyle={{marginBottom: 0}}
        defaultValue={item?.address}
        onPress={async e => {
          await toggleEdit(index);
          if (item.edit_address) {
            dispatch(addNewAddressRequest({address: item.address}));
          }
        }}
        // editButton={}
        // sendInfo={}
        onChange={text => handleInputChange(index, text)}
        value={item.address}
      />
    );
  };

  return (
    <Wrapper
      leftIcon={true}
      rightIcon={false}
      title={'Адреса доставки'}
      bottomLine={true}
      goBack={() =>
        navigation.navigate('TabNavigation', {
          screen: 'ProfileStack',
        })
      }>
      <FlatList
        data={address_list}
        keyExtractor={(_, $) => $.toString()}
        // inverted
        // initialScrollIndex={address_list.length}
        // scrollsToTop={true}
        // contentContainerStyle={{flexDirection: 'column-reverse'}}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          if (!loading || !address_list.length === 0) {
            return (
              <View style={styles.emptyParent}>
                <Text style={styles.emptyText}>Нет продуктов</Text>
              </View>
            );
          }
        }}
        ListFooterComponent={() => {
          if (!loading) {
            if (address_list) {
              return (
                <BigButton
                  buttonText={'Добавить'}
                  buttonStyle={{marginVertical: 80}}
                  navigation={() => addNewInput()}
                />
              );
            }
          } else {
            return <ActivityIndicator color={'#BF8838'} size={50} />;
          }
        }}
      />
      {/*</ScrollView>*/}
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
