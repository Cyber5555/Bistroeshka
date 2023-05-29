import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ButtonColor} from '../colors/colors';

export const BigButton = ({
  buttonText = '',
  navigation,
  buttonStyle,
  loading = Boolean(),
  disabled = Boolean(),
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, {opacity: disabled ? 0.5 : 1}]}
      onPress={navigation}
      disabled={loading || disabled}>
      {loading && <ActivityIndicator color={'#FFF'} size={30} />}
      {!loading && <Text style={styles.text}>{buttonText.toString()}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: ButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 265,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
