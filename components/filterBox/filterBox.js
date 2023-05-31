import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextColor} from '../colors/colors';
import {
  CloseDropdown,
  CloseFilterIcon,
  OpenDropdown,
} from '../icons/includeSvg';
import {Dropdown} from 'react-native-element-dropdown';
import {BigButton} from '../buttons/bigButton';

const {width, height} = Dimensions.get('window');

export const FilterBox = ({
  isOpen,
  setOpen,
  category,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  filter,
  clear,
  changeCategory,
  itemId,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (itemId || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  // const changeStartPrice = e => {
  //   // let new_result = Number(parseInt(e));
  //   let res = e.replace(/^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/);
  //   setStartPrice(res);
  // };

  return (
    <Modal
      style={isOpen ? {right: 0} : {right: -width}}
      visible={isOpen}
      transparent>
      <TouchableOpacity
        activeOpacity={1}
        onPress={setOpen}
        style={[styles.touchable, isOpen ? {right: 0} : {right: -width}]}>
        <TouchableHighlight style={styles.parent}>
          <React.Fragment>
            <View style={styles.titleClose}>
              <Text style={styles.title}>Фильтр</Text>
              <TouchableOpacity onPress={setOpen}>
                <CloseFilterIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.takePriceTitle}>Цена</Text>
            <View style={styles.inputsParentFirst}>
              <View style={styles.inputsParent}>
                <Text style={styles.otDo}>От</Text>
                <TextInput
                  style={styles.inputs}
                  keyboardType="number-pad"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
              </View>
              <View style={styles.line}></View>
              <View style={styles.inputsParent}>
                <Text style={styles.otDo}>До</Text>
                <TextInput
                  style={styles.inputs}
                  keyboardType="number-pad"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>
            </View>

            <Text style={styles.takePriceTitle}>Категория</Text>

            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              // iconStyle={styles.iconStyle}
              data={category}
              // search
              iconStyle={{
                borderWidth: 1,
              }}
              renderRightIcon={() =>
                isFocus ? <CloseDropdown /> : <OpenDropdown />
              }
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder={!isFocus ? 'Выберите категорию' : '...'}
              // searchPlaceholder="Search..."
              value={itemId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                changeCategory(item.id);
                setIsFocus(false);
              }}
              renderLeftIcon={null}
            />
            <View style={styles.buttons}>
              <BigButton buttonText={'Филтер'} navigation={filter} />
              <BigButton
                buttonText={'Сбросить'}
                navigation={clear}
                buttonStyle={{
                  marginTop: 15,
                }}
              />
            </View>
          </React.Fragment>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    width: width,
    height: height + 80,
    zIndex: 100,
    top: 0,
  },
  parent: {
    width: width / 1.2,
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  titleClose: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    color: TextColor,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  line: {
    width: 12,
    height: 0,
    borderWidth: 1,
  },
  inputsParentFirst: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  inputsParent: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputs: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    color: TextColor,
  },
  takePriceTitle: {
    color: '#662916',
    marginBottom: 11,
    marginTop: 35,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  otDo: {
    fontFamily: 'Montserrat-Medium',
    color: TextColor,
    width: '20%',
    marginLeft: 5,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: TextColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: TextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    color: TextColor,
  },
  buttons: {
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
  },
});
