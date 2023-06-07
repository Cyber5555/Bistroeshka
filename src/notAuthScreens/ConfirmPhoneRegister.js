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
import { useCallback, useEffect, useRef, useState } from "react";
import { CodeField } from "react-native-confirmation-code-field";
import SuccessModal from "./../../components/modals/successModal";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBorder,
  clearState,
  makeVerificationRegisterRequest,
} from "../../store/reducer/makeVerificationRegisterSlice";
import { resendCodeVerifyRequest } from "../../store/reducer/resendCodeVerifySlice";

export default ConfirmPhoneRegister = ({ route, targetDate }) => {
  const [modal_open, setModalOpen] = useState(false);
  const [send_button, setSendButton] = useState(true);
  const [code_verify, setCodeVerify] = useState("");
  const [counter, setCounter] = useState(60);
  const [accept, setAccept] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state1 => state1);
  const {
    verify_register_success,
    verify_register_error,
    loading,
    error_border,
  } = state.makeVerificationRegisterSlice;
  const inputRef = useRef();

  useEffect(() => {
    dispatch(clearBorder());
    dispatch(clearState());
  }, [navigation]);

  useEffect(() => {
    if (verify_register_success) {
      setModalOpen(true);
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
    <Wrapper
      leftIcon={true}
      goBack={() => {
        navigation.goBack();
        dispatch(clearBorder());
        dispatch(clearState());
      }}>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Подтверждение тел. номера</Text>
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
          disabled={accept == true}>
          Отправить код повторно
        </Text>
        <BigButton
          buttonText={"Подтвердить"}
          navigation={() => {
            dispatch(
              makeVerificationRegisterRequest({
                phone: route.params.parameter,
                remember_token: code_verify,
              }),
            );
          }}
          buttonStyle={styles.button}
          disabled={send_button}
          loading={loading}
        />
        <SuccessModal
          visible={modal_open}
          successText={"Ваш номер\n подтверждён"}
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
    marginTop: 10,
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
  timerBoxes: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
    // marginBottom: 20,
  },
  timer: {
    color: TextColor,
    textAlign: "center",
    // marginBottom: 20,
    fontSize: 14,
  },
});
