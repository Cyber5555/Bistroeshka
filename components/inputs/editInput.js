import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackgroundInput, TextColor} from '../colors/colors';
import {ArrowRightIcon, EditIcon, IsVerifyIcon} from '../icons/includeSvg';

const EditInput = ({
  label,
  keyboardType,
  propsStyle,
  secureTextEntry,
  value,
  onChange,
  isVerify = false,
  arrowRight = false,
  edit = false,
  placeholder,
  onPress,
  editable,
  delate = false,
  defaultValue,
  delateButton,
  sendInfo,
}) => {
  return (
    <View style={[styles.inputParent, propsStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={TextColor}
        editable={editable}
        defaultValue={defaultValue}
      />
      {delate && (
        <Text style={styles.delate} onPress={delateButton}>
          Удалить
        </Text>
      )}
      {edit && (
        <TouchableOpacity
          style={[styles.buttons, delate ? {bottom: 20} : {bottom: 0}]}
          onPress={onPress}>
          <EditIcon />
        </TouchableOpacity>
      )}
      {arrowRight && (
        <TouchableOpacity
          style={[styles.buttons, delate ? {bottom: 20} : {bottom: 0}]}
          onPress={onPress}>
          <ArrowRightIcon />
        </TouchableOpacity>
      )}
      {isVerify && (
        <TouchableOpacity
          style={[styles.buttons, delate ? {bottom: 20} : {bottom: 0}]}
          onPress={onPress}>
          <IsVerifyIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputParent: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },
  label: {
    color: TextColor,
    fontSize: 15,
    marginBottom: 7,
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    height: 40,
    backgroundColor: BackgroundInput,
    borderRadius: 6,
    color: TextColor,
    paddingLeft: 10,
  },
  buttons: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  delate: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#FF0000',
    textAlign: 'right',
    marginTop: 5,
  },
});

export default EditInput;
