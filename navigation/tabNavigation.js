import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Catalog from '../src/authScreens/Catalog';
import {
  ActiveFavoriteIcon,
  ActiveProfileIcon,
  BegActive,
  BegNoActive,
  CatalogActive,
  CatalogIcon,
  FavoriteIcon,
  ProfileIcon,
} from '../components/icons/includeSvg';
import {createStackNavigator} from '@react-navigation/stack';
import SinglePage from '../src/authScreens/SinglePage';
import Favorites from '../src/authScreens/Favorites';
import BegPage from '../src/authScreens/BegPage';
import ProfilePage from '../src/authScreens/ProfilePage';
import NotAuthNavigators from './notAuthNavigators';
import ShopHistory from '../src/authScreens/ShopHistory';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginOrRegister from '../src/notAuthScreens/LoginOrRegister';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default TabNavigation = ({route}) => {
  // const navigation = useNavigation();
  // const routes = navigation.getState()?.routes;
  // const prevRoute = routes[routes.length - 1];
  // console.group(prevRoute.state.routes);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(userToken => {
      setToken(userToken);
    });
  }, []);

  return (
    <Tab.Navigator
      // initialRouteName="CatalogStack"
      backBehavior="history"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#DDAC5F',
        tabBarInactiveTintColor: '#662916',
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Regular',
          marginTop: -20,
          marginBottom: 20,
          fontSize: 10,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          height: 80,
          borderColor: '#EDEAE4',
        },
      })}>
      <Tab.Screen
        name="CatalogStack"
        component={CatalogStack}
        options={({focused}) => ({
          tabBarLabel: 'Каталог',
          tabBarIcon: ({focused}) => {
            return <CatalogIcons focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="BegsStack"
        component={BegsStack}
        options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: ({focused}) => {
            return <BegIcons focused={focused} />;
          },
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Избранные',
          tabBarIcon: ({focused}) => {
            return <FavoriteIcons focused={focused} />;
          },
        }}
      />

      <Tab.Screen
        name={token ? 'ProfileStack' : 'LoginOrRegister'}
        component={token ? ProfileStack : LoginOrRegister}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({focused}) => {
            return <ProfileIcons focused={focused} />;
          },
        }}
      />

      <Tab.Screen
        name="SinglePage"
        component={SinglePage}
        options={{
          tabBarItemStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
};

const ProfileIcons = ({focused}) => {
  return focused ? <ActiveProfileIcon /> : <ProfileIcon />;
};
const FavoriteIcons = ({focused}) => {
  return focused ? <ActiveFavoriteIcon /> : <FavoriteIcon />;
};
const BegIcons = ({focused}) => {
  return focused ? <BegActive /> : <BegNoActive />;
};
const CatalogIcons = ({focused}) => {
  return focused ? <CatalogActive /> : <CatalogIcon />;
};

const CatalogStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Catalog" component={Catalog} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

const BegsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BegPage" component={BegPage} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="ShopHistory" component={ShopHistory} />
    </Stack.Navigator>
  );
};
