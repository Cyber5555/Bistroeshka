import {Button, StyleSheet, Text, View} from 'react-native';
import Wrapper from '../../components/fixedElements/Wrapper';
import {ButtonColor, TextColor} from '../../components/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputContainer from '../../components/inputs/InputContainer';
import {BigButton} from '../../components/buttons/bigButton';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {clearLoginState, loginRequest} from '../../store/reducer/loginSlice';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from './../../components/inputs/phoneInput';
import RNRestart from 'react-native-restart';

export default LoginScreen = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const state = useSelector(state => state);
  const {password_error, phone_error, user_not_verify, loading, success_login} =
    state.loginSlice;

  useEffect(() => {
    if (user_not_verify) {
      navigation.navigate('ConfirmPhoneRegister', {
        parameter: phone,
      });
      dispatch(clearLoginState());
      setPassword('');
      setPhone('');
    }
  }, [user_not_verify]);

  useEffect(() => {
    if (success_login) {
      // RNRestart.Restart();
      navigation.navigate(
        'TabNavigation',
        // {
        //   screen: 'Catalog',
        // }
      );
    }
  }, [success_login]);

  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Вход</Text>
        <PhoneInput
          label={'Номер телефона'}
          keyboardType={'phone-pad'}
          propsStyle={styles.firstInput}
          onChangeText={e => setPhone(e)}
          value={phone}
          error={phone_error}
        />
        <InputContainer
          label={'Пароль'}
          keyboardType={'default'}
          secureTextEntry={eye}
          setEye={() => setEye(!eye)}
          password={true}
          onChangeText={e => setPassword(e)}
          value={password}
          error={password_error}
        />
        <Text
          style={styles.forgotText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Забыли пароль?
        </Text>
        <BigButton
          buttonText={'Войти'}
          loading={loading}
          navigation={() => {
            dispatch(
              loginRequest({
                phone: phone,
                password: password,
              }),
            );
          }}
        />
        <Text style={styles.haveAccount}>Нет аккаунта?</Text>
        <Text
          onPress={() => navigation.navigate('RegisterScreen')}
          style={styles.goToReg}>
          Зарегистрироваться
        </Text>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 114,
    color: TextColor,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    marginBottom: 30,
  },
  firstInput: {
    marginBottom: 15,
  },
  forgotText: {
    textAlign: 'right',
    color: TextColor,
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline',
  },
  haveAccount: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: TextColor,
    textAlign: 'center',
    marginTop: 30,
  },
  goToReg: {
    color: ButtonColor,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginBottom: 20,
  },
});
