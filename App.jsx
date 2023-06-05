import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import NotAuthNavigators from "./navigation/notAuthNavigators";
import TabNavigation from "./navigation/tabNavigation";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor={"white"}
          barStyle={"light-content"}
        />
        <Stack.Navigator
          initialRouteName="TabNavigation"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="NotAuthNavigators"
            component={NotAuthNavigators}
          />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
