import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import NotAuthNavigators from './navigation/notAuthNavigators';
import TabNavigation from './navigation/tabNavigation';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {store} from './store';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  // const state = useSelector(state => state);
  // const {success_login} = state.loginSlice;

  useEffect(() => {
    // AsyncStorage.getItem('userToken').then(userToken => {
    //   if (userToken) {
    //     setIsAuth(true);
    //   } else {
    //     setIsAuth(false);
    //   }
    // });
    // AsyncStorage.clear();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />
        <Stack.Navigator
          initialRouteName="NotAuthNavigators"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="NotAuthNavigators"
            component={NotAuthNavigators}
          />

          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
        {/* {isAuth ? < /> : < />} */}
      </NavigationContainer>
    </Provider>
  );
};
export default App;
