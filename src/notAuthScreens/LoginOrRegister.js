import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Wrapper from "../../components/fixedElements/Wrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextColor } from "../../components/colors/colors";
import { BigButton } from "../../components/buttons/bigButton";

const { width } = Dimensions.get("window");
export default LoginOrRegister = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Wrapper goBack={() => navigation.goBack()} leftIcon={true}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/loginOrReg.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          Для продолжения действий, войдите в аккаунт или зарегистрируйтесь.
        </Text>
        <BigButton
          buttonText={"Войти"}
          navigation={() =>
            navigation.navigate("NotAuthNavigators", {
              screen: "LoginScreen",
            })
          }
        />
        <BigButton
          buttonText={"Зарегистрироваться"}
          buttonStyle={styles.buttonStyle}
          navigation={() =>
            navigation.navigate("NotAuthNavigators", {
              screen: "RegisterScreen",
            })
          }
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width / 2,
    height: width / 2,
  },
  text: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    color: TextColor,
    marginTop: 45,
    marginBottom: 15,
  },
  buttonStyle: {
    marginTop: 15,
  },
});
