import {Button, StyleSheet, Text, View} from 'react-native';
import Wrapper from '../../components/fixedElements/Wrapper';
import {ButtonColor, TextColor} from '../../components/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputContainer from '../../components/inputs/InputContainer';
import {BigButton} from '../../components/buttons/bigButton';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import PhoneInput from '../../components/inputs/phoneInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearErrorMessage,
  registerRequest,
} from '../../store/reducer/registerSlice';
import SpinnerLoader from './../../components/modals/spinner';

export default RegisterScreen = ({route}) => {
  const navigation = useNavigation();
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [paternity, setPaternity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [paternityError, setPaternityError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {
    password_error,
    phone_error,
    name_error,
    surname_error,
    address_error,
    password_confirmation_error,
    paternity_error,
    loading,
    success,
  } = state.registerSlice;

  useEffect(() => {
    setPasswordError(password_error);
    setNameError(name_error);
    setSurnameError(surname_error);
    setPaternityError(paternity_error);
    setPhoneError(phone_error);
    setAddressError(address_error);
    setPasswordConfirmationError(password_confirmation_error);
  }, [loading]);

  useEffect(() => {
    if (success) {
      navigation.navigate('ConfirmPhoneRegister', {
        parameter: phone,
      });
      dispatch(clearErrorMessage());
    }
  }, [success]);

  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Регистрация</Text>
        <InputContainer
          label={'Имя'}
          keyboardType={'default'}
          propsStyle={styles.firstInput}
          onChangeText={value => {
            setNameError('');
            setName(value);
          }}
          value={name}
          error={nameError}
        />
        <InputContainer
          label={'Фамилия'}
          keyboardType={'default'}
          propsStyle={styles.firstInput}
          onChangeText={value => {
            setSurnameError('');
            setSurname(value);
          }}
          value={surname}
          error={surnameError}
        />
        <InputContainer
          label={'Отчество'}
          keyboardType={'default'}
          propsStyle={styles.firstInput}
          onChangeText={value => {
            setPaternityError('');
            setPaternity(value);
          }}
          value={paternity}
          error={paternityError}
        />
        <PhoneInput
          label={'Номер телефона'}
          keyboardType={'phone-pad'}
          propsStyle={styles.firstInput}
          onChangeText={value => {

            setPhone(value);
            setPhoneError('');
          }}
          value={phone}
          error={phoneError}
        />
        <InputContainer
          label={'Адрес доставки'}
          keyboardType={'default'}
          propsStyle={styles.firstInput}
          onChangeText={value => {
            setAddressError('');
            setAddress(value);
          }}
          value={address}
          error={addressError}
        />
        <InputContainer
          label={'Пароль'}
          keyboardType={'default'}
          secureTextEntry={passwordEye}
          propsStyle={styles.firstInput}
          password={true}
          setEye={() => setPasswordEye(!passwordEye)}
          onChangeText={value => {
            setPasswordError('');
            setPassword(value);
          }}
          value={password}
          error={passwordError}
        />
        <InputContainer
          label={'Повторите пароль'}
          keyboardType={'default'}
          secureTextEntry={confirmPasswordEye}
          propsStyle={styles.firstInput}
          password={true}
          setEye={() => setConfirmPasswordEye(!confirmPasswordEye)}
          onChangeText={value => {
            setPasswordConfirmationError('');
            setConfirmPassword(value);
          }}
          value={confirmPassword}
          error={passwordConfirmationError}
        />

        <BigButton
          buttonText={'Зарегистрироваться'}
          navigation={() => {
            loading = {loading};
            dispatch(clearErrorMessage());

            dispatch(
              registerRequest({
                name: name,
                lastName: paternity,
                surname: surname,
                password: password,
                password_confirmation: confirmPassword,
                phone: phone,
                address: address,
              }),
            );

            // navigation.navigate('ConfirmPhoneRegister');
          }}
        />
        <Text style={styles.haveAccount}>
          Уже есть аккаунт?{' '}
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.goToLogin}>
            Войти
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    color: TextColor,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    marginBottom: 30,
  },
  firstInput: {
    marginBottom: 15,
  },
  haveAccount: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: TextColor,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  goToLogin: {
    color: ButtonColor,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
});
