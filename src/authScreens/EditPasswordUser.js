import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Wrapper from "../../components/fixedElements/Wrapper";
import { TextColor } from "../../components/colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputContainer from "../../components/inputs/InputContainer";
import { BigButton } from "../../components/buttons/bigButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeAuthUserPasswordRequest } from "../../store/authReducer/changeAuthUserPasswordSlice";

export default EditPasswordUser = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [oldEye, setOldEye] = useState(true);
  const [newEye, setNewEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(true);
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_confirmation, setNewPasswordConfirmation] = useState("");
  const state = useSelector(state1 => state1);
  const {
    old_password_error,
    new_password_error,
    new_password_confirmation_error,
    loading,
  } = state.changeAuthUserPasswordSlice;

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(userToken => {
      setToken(userToken);
    });
  }, [navigation]);


  return (
    <Wrapper
      leftIcon={true}
      goBack={() =>
        navigation.navigate("TabNavigation", {
          screen: "ProfileStack",
        })
      }>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Изменение пароля</Text>

        <Text style={styles.info}>
          Придумайте сложный пароль,содержащий строчные и прописные буквы,а так
          же цифры и символы
        </Text>

        <InputContainer
          label={"Старый пароль"}
          keyboardType={"default"}
          propsStyle={styles.inputs}
          secureTextEntry={oldEye}
          password={true}
          setEye={() => setOldEye(!oldEye)}
          value={old_password}
          onChangeText={(e) => setOldPassword(e)}
          error={old_password_error}
        />
        <InputContainer
          label={"Новый пароль"}
          keyboardType={"default"}
          secureTextEntry={newEye}
          propsStyle={styles.inputs}
          password={true}
          setEye={() => setNewEye(!newEye)}
          value={new_password}
          onChangeText={(e) => setNewPassword(e)}
          error={new_password_error}
        />
        <InputContainer
          label={"Повторите пароль"}
          keyboardType={"default"}
          secureTextEntry={confirmEye}
          propsStyle={styles.inputs}
          password={true}
          setEye={() => setConfirmEye(!confirmEye)}
          value={new_password_confirmation}
          onChangeText={(e) => setNewPasswordConfirmation(e)}
          error={new_password_confirmation_error}
        />
        <BigButton
          buttonText={"Сохранить"}
          buttonStyle={{ marginBottom: 20 }}
          navigation={() => {
            dispatch(changeAuthUserPasswordRequest({
              old_password: old_password,
              new_password: new_password,
              new_password_confirmation: new_password_confirmation,
              token: token,
            })).then(res => {
              if (res.payload.status) {
                navigation.navigate("TabNavigation", {
                  screen: "ProfilePage",
                });
              }
            });

          }}
          loading={loading}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    color: TextColor,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Raleway-Medium",
  },
  inputs: {
    marginBottom: 15,
  },
  info: {
    color: "#545454",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});
