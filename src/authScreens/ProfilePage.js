import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Wrapper from './../../components/fixedElements/Wrapper';
import {TextColor} from '../../components/colors/colors';
import EditInput from '../../components/inputs/editInput';
import {BigButton} from './../../components/buttons/bigButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthUserInfoRequest} from '../../store/authReducer/getAuthUserInfoSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {changeUserInfoRequest} from '../../store/authReducer/changeUserInfoSlice';

const {width} = Dimensions.get('window');
export default ProfilePage = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [nameEdit, setNameEdit] = useState(false);
  const [surnameEdit, setSurnameEdit] = useState(false);
  const [paternityEdit, setPaternityEdit] = useState(false);
  const [token, setToken] = useState(null);
  const state = useSelector(state => state);
  const {auth_user_info} = state.getAuthUserInfoSlice;
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [surname, setSurName] = useState();
  const [filePath, setFilePath] = useState();

  useEffect(() => {
    // const isFocus = navigation.addListener('focus', () => {
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
      dispatch(getAuthUserInfoRequest({token: userToken}));
    });
    // });

    // return () => isFocus();
  }, [navigation]);

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: "data:image/jpeg;base64," + response,
        // };
        setFilePath(response.assets[0].uri);
        // console.log(response.assets[0].uri);
      }
    });
  };

  return (
    <Wrapper
      stylePropsWrap={{paddingHorizontal: 0}}
      styleProps={{paddingHorizontal: 20}}
      leftIcon={true}
      rightIcon={false}
      history={true}
      goBack={() => navigation.goBack()}
      navigation={() => navigation.navigate('ShopHistory')}
      title={'Личный кабинет'}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarNameParent}>
          <TouchableOpacity onPress={chooseFile}>
            {filePath ? (
              <Image source={{uri: filePath}} style={styles.avatar} />
            ) : (
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.avatar}
              />
            )}
          </TouchableOpacity>
          <View style={styles.nameSurnameParent}>
            <Text style={styles.nameSurname} numberOfLines={1}>
              {auth_user_info?.name} {auth_user_info?.lastName}
            </Text>
            <Text style={styles.phoneNumber}>{auth_user_info?.phone}</Text>
          </View>
        </View>

        <View style={styles.moreDetailProfile}>
          <EditInput
            keyboardType={'default'}
            defaultValue={auth_user_info?.lastName}
            label={'Фамилия'}
            isVerify={surnameEdit}
            edit={!surnameEdit}
            arrowRight={false}
            placeholder={'Смирнова'}
            editable={surnameEdit}
            onPress={() => {
              setSurnameEdit(!surnameEdit);
              if (surnameEdit) {
                dispatch(changeUserInfoRequest({last_name: lastName})).then(
                  res => {
                    dispatch(getAuthUserInfoRequest({token: token}));
                  },
                );
              }
            }}
            onChange={e => setLastName(e)}
            value={lastName}
          />
          <EditInput
            keyboardType={'default'}
            defaultValue={auth_user_info?.name}
            label={'Имя'}
            isVerify={nameEdit}
            edit={!nameEdit}
            arrowRight={false}
            placeholder={'Александра'}
            editable={nameEdit}
            onPress={() => {
              setNameEdit(!nameEdit);
              if (nameEdit) {
                dispatch(changeUserInfoRequest({name: name})).then(res => {
                  dispatch(getAuthUserInfoRequest({token: token}));
                });
              }
            }}
            onChange={e => setName(e)}
            value={name}
          />
          <EditInput
            keyboardType={'default'}
            defaultValue={auth_user_info?.surname}
            label={'Отчество'}
            isVerify={paternityEdit}
            edit={!paternityEdit}
            arrowRight={false}
            placeholder={'Викторовна'}
            editable={paternityEdit}
            onPress={() => {
              setPaternityEdit(!paternityEdit);
              if (paternityEdit) {
                dispatch(changeUserInfoRequest({surname: surname})).then(
                  res => {
                    dispatch(getAuthUserInfoRequest({token: token}));
                  },
                );
              }
            }}
            onChange={e => setSurName(e)}
            value={surname}
          />
          <EditInput
            keyboardType={'default'}
            label={'Адреса доставки'}
            isVerify={false}
            arrowRight={true}
            edit={false}
            placeholder={'Перейти'}
            editable={false}
            onPress={() =>
              navigation.navigate('NotAuthNavigators', {
                screen: 'EditAddress',
              })
            }
            // onChange={null}
            // value={''}
          />
          <EditInput
            keyboardType={'default'}
            label={'Пароль'}
            isVerify={false}
            arrowRight={true}
            edit={false}
            secureTextEntry={true}
            placeholder={'*********'}
            editable={false}
            onPress={() =>
              navigation.navigate('NotAuthNavigators', {
                screen: 'EditPasswordUser',
              })
            }
            // onChange={null}
            // value={''}
          />
          <BigButton
            buttonText={'Выйти'}
            navigation={async () => {
              // await AsyncStorage.clear();
              // await RNRestart.Restart();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  avatarNameParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
    columnGap: 15,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  nameSurnameParent: {
    rowGap: 6,
  },
  nameSurname: {
    color: TextColor,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    width: width - 120,
  },
  phoneNumber: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: TextColor,
  },
  moreDetailProfile: {
    width: width,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#F2F2F2',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 28,
    padding: 25,
  },
});
