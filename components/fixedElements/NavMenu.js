import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackButton, HistoryIcon, OpenFilterIcon} from '../icons/includeSvg';
import {TextColor} from '../colors/colors';

const width = Dimensions.get('window').width;

export default NavMenu = ({
  leftIcon = false,
  title = '',
  rightIcon = false,
  navigation,
  openFilter,
  bottomLine = false,
  history = false,
  styleProps,
  goBack,
}) => {
  return (
    <View style={[styles.staticStile, styleProps]}>
      {bottomLine && <View style={styles.bottomLine}></View>}
      {leftIcon ? (
        <TouchableOpacity onPress={goBack}>
          <BackButton />
        </TouchableOpacity>
      ) : (
        <View style={{width: 35}}></View>
      )}
      {title ? <Text style={styles.title}>{title}</Text> : <View></View>}
      {rightIcon ? (
        <TouchableOpacity onPress={openFilter}>
          <OpenFilterIcon />
        </TouchableOpacity>
      ) : history ? (
        <TouchableOpacity onPress={navigation}>
          <HistoryIcon />
        </TouchableOpacity>
      ) : (
        <View style={{width: 35}}></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  staticStile: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: TextColor,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  bottomLine: {
    width: width,
    height: 2,
    backgroundColor: '#F7F7F7',
    bottom: 0,
    position: 'absolute',
    left: -20,
  },
});
