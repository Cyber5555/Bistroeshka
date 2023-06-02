import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../src/notAuthScreens/LoginScreen";
import RegisterScreen from "./../src/notAuthScreens/RegisterScreen";
import ForgotPassword from "../src/notAuthScreens/ForgotPassword";
import ConfirmTellScreen from "../src/notAuthScreens/ConfirmTellScreen";
import NewPassword from "../src/notAuthScreens/NewPassword";
import ConfirmPhoneRegister from "../src/notAuthScreens/ConfirmPhoneRegister";
import EditAddress from "../src/authScreens/EditAddress";
import EditPasswordUser from "./../src/authScreens/EditPasswordUser";

const Stack = createStackNavigator();

export default NotAuthNavigators = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="ConfirmPhoneRegister"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ConfirmTellScreen" component={ConfirmTellScreen} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen
        name="ConfirmPhoneRegister"
        component={ConfirmPhoneRegister}
      />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="EditPasswordUser" component={EditPasswordUser} />
    </Stack.Navigator>
  );
};
