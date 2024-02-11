import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from "react-native";
// android 635201532372-uvk0bbte258sbto6dcqlse9ua5icf4nf.apps.googleusercontent.com
// web 635201532372-dfb45fe7onb61i65i960i9lur94264ct.apps.googleusercontent.com

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { json } from "body-parser";
import Input from "./Input";
var { height, width } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [req, res, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "635201532372-uvk0bbte258sbto6dcqlse9ua5icf4nf.apps.googleusercontent.com",
    webClientId:
      "635201532372-dfb45fe7onb61i65i960i9lur94264ct.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSingInWithGoogle();
  }, [res]);

  console.log(userInfo);

  async function handleSingInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (res?.type === "success") {
        await getUserInfo(res.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user, null, 2));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (err) {
      console.log("errorr getUserInfo", err);
    }
  };

  console.log(JSON.stringify(userInfo));

  if (!userInfo) {
    return (
      <View style={styles.container}>
        {/* {JSON.stringify(userInfo)}
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Google" onPress={() => promptAsync()} />
        <Button title="Delete Storage" onPress={() => AsyncStorage.removeItem("@user")} />
        <StatusBar style="auto" /> */}
        <View>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            You muse sign in to join
          </Text>
          <Text
            style={{ textAlign: "center", marginVertical: 10, color: "gray" }}
          >
            We’re a Team That Guides Each Other
          </Text>
        </View>
        {/* google */}
        <Pressable style={styles.loginWithContainer} onPress={promptAsync}>
          <View style={styles.loginWith}>
            <Image
              source={require("./assets/google.png")}
              style={{ width: 25, height: 25, marginRight: 10 }} //
            />
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
              Sign in with Google
            </Text>
          </View>
        </Pressable>

        {/* Facebook */}
        <Pressable style={styles.loginWithContainer}>
          <View style={styles.loginWith}>
            <Image
              source={require("./assets/facebook.png")}
              style={{ width: 25, height: 25, marginRight: 10 }} //
            />
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
              Sign in with Facebook
            </Text>
          </View>
        </Pressable>

        {/* or */}
        <View
          style={{
            borderWidth: 0.7,
            width: "75%",
            borderColor: "#f36d72",
            marginVertical: 20,
          }}
        ></View>
        <View
          style={{ backgroundColor: "white", top: -30, paddingHorizontal: 10 }}
        >
          <Text style={styles.or}>or</Text>
        </View>

        {/* email */}
        <View style={[styles.input, { marginTop: -15 }]}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              position: "relative",
              left: -103,
            }}
          >
            Username or Email
          </Text>
          <Input
            placeholder={"Enter Username or Email"}
            name={"email"}
            id={"email"}
            // value={email}
            // onChangeText={(text) => setEmail(text.toLowerCase())}
            // onSubmitEditing={() => handleSubmit()}
            returnKeyType="next"
          />
          <View style={styles.iconUser}>
            {/* <FontAwesome name="user" size={25} color="#f36d72" /> */}
          </View>
        </View>

        {/* password */}
        <View style={styles.input}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              position: "relative",
              left: -138,
            }}
          >
            Password
          </Text>
          <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            onChangeText={(text) => setPassowrd(text)}
            onSubmitEditing={() => handleSubmit()}
            returnKeyType="next"
          />
          <View style={styles.iconPassword}>
            {/* <FontAwesome name='lock' size={25} color='gray' /> */}
          </View>
          <TouchableOpacity>
            <View style={styles.iconEye}>
              {/* <Entypo name='eye-with-line' size={22} color='gray' /> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: "#f36d72",
                fontWeight: "bold",
                position: "relative",
                right: -105,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* login */}

        <View style={styles.btnLogin}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            Sign in
          </Text>
        </View>
      </View>
    );
  }
  if (userInfo) {
    console.log("ddd", userInfo.picture);
    return (
      <View style={styles.containerFacebook}>
        <View style={styles.backImageContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: userInfo.picture }} />
          </View>
        </View>
        <Text style={{ fontSize: 25, color: "black", marginVertical: 25 }}>
          {userInfo.name}
        </Text>

        {/* uid */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>ID</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}>{userInfo.id}</Text>
          </View>
        </View>
        {/* email */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Email</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}>{userInfo.email}</Text>
          </View>
        </View>
        {/* Address */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Address</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}> - </Text>
          </View>
        </View>
        {/* Birth */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Birth</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}> - </Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            AsyncStorage.removeItem("@user");
            setUserInfo(false);
          }}
        >
          <View style={styles.btnLogin}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Logout
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //facebook
  containerFacebook: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 55,
  },
  backImageContainer: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: -1,
    backgroundColor: "#fcb69f",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderStyle: "solid",
    borderWidth: 5,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    position: "relative",
    top: 90,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: "whitesmoke",
  },
  formDetail: {
    width: 330,
    marginBottom: 10,
  },
  detailValue: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "whitesmoke",
    marginTop: 10,
    alignItems: "center",
  },
  textValue: {
    color: "black",
    fontSize: 17,
  },
  //facebook
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 55,
    paddingTop: 100,
  },
  loginWithContainer: {
    borderWidth: 2,
    padding: 15,
    borderColor: "#dfdfdf",
    width: 330,
    marginVertical: 7,
    borderRadius: 10,
  },
  loginWith: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  or: {
    zIndex: 1,
    position: "relative",
    // eslint-disable-next-line no-dupe-keys
    top: -3,
    fontSize: 15,
    color: "black",
    borderRadius: 50,
  },
  input: {
    width: "100%",
    alignItems: "center",
  },
  btnLogin: {
    backgroundColor: "#f36d72",
    width: 330,
    height: 44,
    padding: 10,
    alignItems: "center", // center x
    justifyContent: "center", //center y
    borderRadius: 10,
    marginTop: 15,
  },
});
