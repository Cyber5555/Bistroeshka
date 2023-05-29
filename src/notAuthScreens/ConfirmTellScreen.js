import {StyleSheet, Text, TextInput, View} from 'react-native';
import Wrapper from '../../components/fixedElements/Wrapper';
import {
  BackgroundInput,
  ButtonColor,
  TextColor,
} from '../../components/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BigButton} from '../../components/buttons/bigButton';
import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {CodeField} from 'react-native-confirmation-code-field';

export default ConfirmTellScreen = ({}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;
    if (symbol) {
      textChild = symbol;
      focus = true;
    }
    return (
      <TextInput
        key={index}
        style={[
          styles.confirmInput,
          // isFocused && styles.focusCell,
          {borderColor: 'red'},
        ]}
        value={textChild}
      />
    );
  };

  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.forgotInfo}>
          На ваш номер телефона отправлен код подтверждения,введите его ниже
          чтобы закончить регистрацию
        </Text>

        <CodeField
          autoFocus={true}
          ref={inputRef}
          value={value}
          onChangeText={e => setValue(e)}
          cellCount={4}
          keyboardType="number-pad"
          renderCell={renderCell}
          rootStyle={styles.confirmInputParent}
        />

        <Text style={styles.sendCodeMore}>Отправить код повторно</Text>
        <BigButton
          buttonText={'Подтвердить'}
          navigation={() => navigation.navigate('NewPassword')}
          buttonStyle={styles.button}
        />
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
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 30,
  },
  forgotInfo: {
    color: '#545454',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Montserrat-Regular',
  },
  confirmInputParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  confirmInput: {
    width: 45,
    height: 60,
    backgroundColor: BackgroundInput,
    borderRadius: 8,
    color: TextColor,
    textAlign: 'center',
  },
  sendCodeMore: {
    textAlign: 'center',
    color: TextColor,
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
  },
  button: {
    marginBottom: 20,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: TextColor,
  },
});
