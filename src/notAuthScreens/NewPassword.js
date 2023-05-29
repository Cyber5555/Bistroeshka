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
import InputContainer from '../../components/inputs/InputContainer';
import {useState} from 'react';
import SuccessModal from '../../components/modals/successModal';

export default NewPassword = ({}) => {
  const navigation = useNavigation();
  const [modal_open, setModalOpen] = useState(false);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Задайте{'\n'} новый пароль</Text>
        <Text style={styles.forgotInfo}>
          Придумайте сложный пароль,содержащий строчные и прописные буквы,а так
          же цифры и символы
        </Text>
        <InputContainer
          label={'Пароль'}
          keyboardType={'default'}
          propsStyle={styles.firstInput}
          secureTextEntry={eye1}
          password={true}
          setEye={() => setEye1(!eye1)}
        />
        <InputContainer
          label={'Повторите пароль'}
          keyboardType={'default'}
          secureTextEntry={eye2}
          password={true}
          setEye={() => setEye2(!eye2)}
        />
        <Text style={styles.sendCodeMore}>Отправить код повторно</Text>
        <BigButton
          buttonText={'Подтвердить'}
          buttonStyle={styles.button}
          navigation={() => setModalOpen(true)}
        />
        <SuccessModal
          visible={modal_open}
          successText={'Ваш пароль успешно изменён'}
          buttonText={'Войти'}
          press={() => {
            navigation.navigate('LoginScreen');
            setModalOpen(false);
          }}
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
  firstInput: {
    marginBottom: 15,
  },
  forgotInfo: {
    color: '#545454',
    textAlign: 'left',
    marginBottom: 25,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
  button: {
    marginBottom: 20,
  },
});
