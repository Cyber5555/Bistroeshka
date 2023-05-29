import {Button, StyleSheet, Text, View} from 'react-native';
import Wrapper from '../../components/fixedElements/Wrapper';
import {ButtonColor, TextColor} from '../../components/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputContainer from '../../components/inputs/InputContainer';
import {BigButton} from '../../components/buttons/bigButton';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default EditPasswordUser = ({}) => {
  const navigation = useNavigation();
  const [oldEye, setOldEye] = useState(true);
  const [newEye, setNewEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(true);
  return (
    <Wrapper
      leftIcon={true}
      goBack={() =>
        navigation.navigate('TabNavigation', {
          screen: 'ProfileStack',
        })
      }>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Изменение пароля</Text>
        <Text style={styles.info}>
          Придумайте сложный пароль,содержащий строчные и прописные буквы,а так
          же цифры и символы
        </Text>
        <InputContainer
          label={'Старый пароль'}
          keyboardType={'default'}
          propsStyle={styles.inputs}
          secureTextEntry={oldEye}
          password={true}
          setEye={() => setOldEye(!oldEye)}
        />
        <InputContainer
          label={'Новый пароль'}
          keyboardType={'default'}
          secureTextEntry={newEye}
          propsStyle={styles.inputs}
          password={true}
          setEye={() => setNewEye(!newEye)}
        />
        <InputContainer
          label={'Повторите пароль'}
          keyboardType={'default'}
          secureTextEntry={confirmEye}
          propsStyle={styles.inputs}
          password={true}
          setEye={() => setConfirmEye(!confirmEye)}
        />
        <BigButton
          buttonText={'Сохранить'}
          buttonStyle={{marginBottom: 20}}
          navigation={() =>
            navigation.navigate('TabNavigation', {
              screen: 'ProfilePage',
            })
          }
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    color: TextColor,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
  },
  inputs: {
    marginBottom: 15,
  },
  info: {
    color: '#545454',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});
