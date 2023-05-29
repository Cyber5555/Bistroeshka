import {useState} from 'react';
import Wrapper from './../../components/fixedElements/Wrapper';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from '../../components/modals/successModal';
import {ShopHistoryRenderedItems} from '../../components/historyItems/historyItems';

const {width} = Dimensions.get('window');
let data = [
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
  {
    image: require('../../assets/images/pica.png'),
    title: 'ПЕПЕРОНИ',
    price: 350,
    gram: 800,
    info: 'Пицца четвертинками с ветчиной, цыпленком, томатами, брынзой, моцареллой, фирменным соусом альфредо',
  },
];

export default BegPage = ({}) => {
  const [modal_visible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <ShopHistoryRenderedItems
        navigation={() =>
          navigation.navigate('SinglePage', {
            screen: 'SinglePage',
          })
        }
        image={item.image}
        title={item.title}
        price={item.price}
        gram={item.gram}
        info={item.info}
        dateTime={'12 марта 2023'}
      />
    );
  };

  return (
    <Wrapper
      leftIcon={true}
      rightIcon={false}
      title={'История покупок'}
      bottomLine={true}
      styleProps={{marginBottom: 10}}
      goBack={() => navigation.goBack()}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
      />
      <SuccessModal
        press={() => setModalVisible(false)}
        visible={modal_visible}
        successText={'Заказ успешно принят'}
        buttonText={'В Каталог'}
      />
    </Wrapper>
  );
};
const styles = StyleSheet.create({});
