import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const SubCategory = ({text, isActive, index, active}) => {
  return (
    <TouchableOpacity
      onPress={isActive}
      style={[
        styles.button,
        {backgroundColor: active === index ? '#662916' : '#FFF2E4'},
      ]}>
      <Text
        style={[
          styles.text,
          {color: active === index ? '#FFFFFF' : '#662916'},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 10,
    marginRight: 5,
    borderRadius: 15,
  },
  text: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
  },
});
