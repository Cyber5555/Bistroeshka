import { StyleSheet, Text } from "react-native";
import Wrapper from "../../components/fixedElements/Wrapper";
import { TextColor } from "../../components/colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BigButton } from "../../components/buttons/bigButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PhoneInput from "../../components/inputs/phoneInput";
import { resendCodeVerifyRequest } from "../../store/reducer/resendCodeVerifySlice";

export default ForgotPassword = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const state = useSelector(state => state);
  const { forgot_password_phone_error } = state.resendCodeVerifySlice;


  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.forgotInfo}>
          Мы отправим 4-ти значный код на ваш номер телефона для подтверждения
          личности
        </Text>
        <PhoneInput
          label={"Номер телефона"}
          keyboardType={"phone-pad"}
          propsStyle={styles.firstInput}
          value={phone}
          onChangeText={(e) => setPhone(e)}
          error={forgot_password_phone_error}
        />
        <BigButton
          buttonText={"Отправить код"}
          navigation={() => {
            dispatch(resendCodeVerifyRequest({ phone: phone })).then(res => {
              console.log(res.payload);
              if (res.payload?.status) {
                navigation.navigate("ConfirmTellScreen", {
                  parameter: phone,
                });
              }
            });
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
    marginBottom: 20,
  },
  forgotInfo: {
    color: "#545454",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "Montserrat-Regular",
  },
});
