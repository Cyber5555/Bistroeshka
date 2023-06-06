import { StyleSheet, Text, TextInput, View } from "react-native";
import Wrapper from "../../components/fixedElements/Wrapper";
import {
  BackgroundInput,
  ButtonColor,
  TextColor,
} from "../../components/colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BigButton } from "../../components/buttons/bigButton";
import { useNavigation } from "@react-navigation/native";
import InputContainer from "../../components/inputs/InputContainer";
import { useState } from "react";
import SuccessModal from "../../components/modals/successModal";
import { useDispatch, useSelector } from "react-redux";
import { newPasswordForgotRequest } from "../../store/reducer/newPasswordForgotSlice";

export const NewPassword = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modal_open, setModalOpen] = useState(false);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const state = useSelector(state1 => state1);
  const {
    password_error,
    password_confirmation_error,
    loading,
    success_change_password,
  } = state.newPasswordForgotSlice;

  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Задайте{"\n"} новый пароль</Text>
        <Text style={styles.forgotInfo}>
          Придумайте сложный пароль,содержащий строчные и прописные буквы,а так
          же цифры и символы
        </Text>

        <InputContainer
          label={"Пароль"}
          keyboardType={"default"}
          propsStyle={styles.firstInput}
          secureTextEntry={eye1}
          password={true}
          setEye={() => setEye1(!eye1)}
          value={password}
          onChangeText={(e) => setPassword(e)}
          error={password_error}
        />
        <InputContainer
          label={"Повторите пароль"}
          keyboardType={"default"}
          secureTextEntry={eye2}
          password={true}
          setEye={() => setEye2(!eye2)}
          value={password_confirmation}
          onChangeText={(e) => setPasswordConfirmation(e)}
          error={password_confirmation_error}
        />

        <BigButton
          buttonText={"Подтвердить"}
          buttonStyle={styles.button}
          navigation={() => {
            // setModalOpen(true);
            console.log(route);
            dispatch(newPasswordForgotRequest({
              phone: route.params.phone,
              password: password,
              password_confirmation: password_confirmation,
              remember_code: route.params.remember_code,
            })).then(res => {
              console.log(res.payload);
              if (res.payload.status) {
                setModalOpen(true);
              }
            });
          }}
          loading={loading}
        />
        <SuccessModal
          visible={modal_open}
          successText={"Ваш пароль успешно изменён"}
          buttonText={"Войти"}
          press={() => {
            navigation.navigate("LoginScreen");
            setModalOpen(false);
          }}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 114,
    color: TextColor,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 30,
  },
  firstInput: {
    marginBottom: 15,
  },
  forgotInfo: {
    color: "#545454",
    textAlign: "left",
    marginBottom: 25,
    fontFamily: "Montserrat-Regular",
    alignSelf: "center",
  },
  button: {
    marginBottom: 20,
  },
});
