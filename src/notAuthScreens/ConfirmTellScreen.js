import { StyleSheet, Text, TextInput, Vibration, View } from "react-native";
import Wrapper from "../../components/fixedElements/Wrapper";
import {
  BackgroundInput,
  ButtonColor,
  TextColor,
} from "../../components/colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BigButton } from "../../components/buttons/bigButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { CodeField } from "react-native-confirmation-code-field";
import { resendCodeVerifyRequest } from "../../store/reducer/resendCodeVerifySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  clearBorder,
  checkCodeForgotPasswordRequest,
} from "../../store/reducer/checkCodeForgotPasswordSlice";


export default ConfirmTellScreen = ({ route }) => {
  const navigation = useNavigation();
  const [code_verify, setCodeVerify] = useState("");
  const inputRef = useRef();
  const [counter, setCounter] = useState(60);
  const [accept, setAccept] = useState(true);
  const [send_button, setSendButton] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector(state1 => state1);
  const {
    verify_register_success,
    verify_register_error,
    loading,
    error_border,
  } = state.checkCodeForgotPasswordSlice;

  useEffect(() => {
    dispatch(clearBorder());
    dispatch(clearState());
  }, [navigation]);

  useEffect(() => {
    if (verify_register_success) {
      dispatch(clearState());
      dispatch(clearBorder());
      setCodeVerify("");
    }
  }, [verify_register_success]);

  useEffect(() => {
    if (verify_register_error) {
      Vibration.vibrate(500);
      dispatch(clearState());
      setCodeVerify("");
    }
  }, [verify_register_error]);

  useEffect(() => {
    if (accept) {
      const timer = counter > 0 && setInterval(() => {
        setCounter(counter - 1);

      }, 1000);
      if (counter == 1) {
        setCounter(60);
        clearInterval(timer);
        setAccept(false);
      }
      return () => clearInterval(timer);
    }
  }, [counter, accept]);


  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;
    if (symbol) {
      textChild = symbol;
      focus = true;
    }
    if (textChild) {
      setSendButton(false);
    } else {
      setSendButton(true);
    }
    return (
      <TextInput
        key={index}
        style={[styles.confirmInput, error_border && styles.focusCell]}
        value={textChild}
      />
    );
  };

  return (
    <Wrapper leftIcon={true} goBack={() => navigation.goBack()}>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.forgotInfo}>
          На ваш номер телефона отправлен код подтверждения,введите его ниже
          чтобы закончить регистрацию
        </Text>

        <Text
          style={styles.timer}>
          {counter == 60 ? `01:00` : counter < 10 ? `00: 0${counter}` : `00: ${counter}`}
        </Text>

        <CodeField
          autoFocus={true}
          ref={inputRef}
          value={code_verify}
          onChangeText={e => {
            setCodeVerify(e);
            dispatch(clearBorder());
          }}
          cellCount={4}
          keyboardType="number-pad"
          renderCell={renderCell}
          rootStyle={styles.confirmInputParent}
        />

        <Text
          style={styles.sendCodeMore}
          onPress={() => {
            dispatch(resendCodeVerifyRequest({ phone: route?.params?.parameter })).then(res => {
              if (res.payload.status) {
                setAccept(true);
              }
            });
          }}
          disabled={accept}>Отправить код повторно</Text>

        <BigButton
          buttonText={"Подтвердить"}
          navigation={() => {
            dispatch(
              checkCodeForgotPasswordRequest({
                phone: route.params.parameter,
                remember_code: code_verify,
              }),
            ).then(res => {
              if (res.payload?.status) {
                navigation.navigate("NewPassword", {
                  phone: route.params.parameter,
                  remember_code: code_verify,
                });
              }
            });
          }}
          buttonStyle={styles.button}
          disabled={send_button}
          loading={loading}
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
  forgotInfo: {
    color: "#545454",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "Montserrat-Regular",
  },
  confirmInputParent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
  confirmInput: {
    width: 45,
    height: 60,
    backgroundColor: BackgroundInput,
    borderRadius: 8,
    color: TextColor,
    textAlign: "center",
  },
  sendCodeMore: {
    textAlign: "center",
    color: TextColor,
    marginTop: 10,
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Medium",
  },
  button: {
    marginBottom: 20,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: "red",
  },
  timer: {
    color: TextColor,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
});
