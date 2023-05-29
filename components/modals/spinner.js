import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextColor} from '../colors/colors';

export default SpinnerLoader = ({visible}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalParent}>
        <ActivityIndicator color={'#BF8838'} size={100} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalParent: {
    flex: 1,
    backgroundColor: '#FFFFFFa0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
