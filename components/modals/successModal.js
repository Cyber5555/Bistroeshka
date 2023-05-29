import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {TextColor} from '../colors/colors';
import {BigButton} from '../buttons/bigButton';
import {useNavigation} from '@react-navigation/native';

export default SuccessModal = ({visible, successText, press, buttonText}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible}>
      <View style={styles.modalParent}>
        <Image
          source={require('../../assets/images/success.png')}
          style={{width: 180, height: 237}}
        />
        <Text style={styles.successText}>{successText}</Text>
        <BigButton
          buttonText={buttonText}
          buttonStyle={styles.button}
          navigation={press}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalParent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: TextColor,
    fontFamily: 'Montserrat-Medium',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    marginVertical: 60,
  },
});
