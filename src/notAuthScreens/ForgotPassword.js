import {StyleSheet, Text} from 'react-native';
import Wrapper from '../../components/fixedElements/Wrapper';
import {ButtonColor, TextColor} from '../../components/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputContainer from '../../components/inputs/InputContainer';
import {BigButton} from '../../components/buttons/bigButton';
import {useNavigation} from '@react-navigation/native';

export default ForgotPassword = ({}) => {
  const navigation = useNavigation();
  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.forgotInfo}>
          Мы отправим 6-ти значный код на ваш номер телефона для подтверждения
          личности
        </Text>
        <InputContainer
          label={'Номер телефона'}
          keyboardType={'phone-pad'}
          propsStyle={styles.firstInput}
        />
        <BigButton
          buttonText={'Отправить код'}
          navigation={() => navigation.navigate('ConfirmTellScreen')}
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
    marginBottom: 20,
  },
  forgotInfo: {
    color: '#545454',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Montserrat-Regular',
  },
});
