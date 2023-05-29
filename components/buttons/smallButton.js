import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ButtonColor} from '../colors/colors';

export default SmallButton = ({buttonText, navigation, buttonStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={navigation}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: ButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
