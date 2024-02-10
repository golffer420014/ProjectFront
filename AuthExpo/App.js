import { StatusBar } from "expo-status-bar";
// web 635201532372-u1obb2hmvg8gm63g8k0cd4fiono3roa0.apps.googleusercontent.com
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import "expo-dev-client";
import react, { useState, useEffect } from "react";
import { firebase } from "./config";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

var { height, width } = Dimensions.get("window");

import Input from "./Input";

export default function App() {
  const [inticial, setInticial] = useState(true);
  const [user, setUser] = useState();
  const [imgUser, setImgUser] = useState();

  const onAuthStateChanged = (user) => {
    if (inticial) setInticial(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(["public_profile", "email"]);
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }
      const facebookcredentail = FacebookAuthProvider.credential(
        data.accessToken
      );
      const auth = getAuth();
      const res = await signInWithCredential(auth, facebookcredentail);
      console.log(JSON.stringify(res, null, 2));
      const jsonString = res._tokenResponse.rawUserInfo;
      const userData = JSON.parse(jsonString);
      const profilePicUrl = userData.picture.data.url;
      // console.log(profilePicUrl);
      setImgUser(profilePicUrl);
      setUser(res);
      await signInWithCredential(firebase.auth(), facebookcredentail);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  if (inticial) return null;

  if (!user) {
    return (
      // <View style={styles.container}>
      //   <Text>Welcome</Text>
      //   <Button title='Sign In With Facebook' onPress={signWithFB}/>
      //   <StatusBar style="auto" />
      // </View>
      <View style={styles.container}>
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
        <TouchableOpacity onPress={() => signIn()}>
          <View style={styles.loginWithContainer}>
            <View style={styles.loginWith}>
              <Image
                source={require("./assets/google.png")}
                style={{ width: 25, height: 25, marginRight: 10 }} //
              />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "black" }}
              >
                Sign in with Google
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity onPress={signWithFB}>
          <View style={styles.loginWithContainer}>
            <View style={styles.loginWith}>
              <Image
                source={require("./assets/facebook.png")}
                style={{ width: 25, height: 25, marginRight: 10 }} //
              />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "black" }}
              >
                Sign in with Google
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
              left: -128,
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
        <TouchableOpacity
        // onPress={() => handleSubmit()}
        >
          <View style={styles.btnLogin}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Sign in
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}
        >
          <Text style={{ fontSize: 15, color: "gray" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
          // onPress={
          //     () => props.navigation.navigate('Register')
          // }
          >
            <Text
              style={{ color: "#f36d72", fontSize: 15, fontWeight: "bold" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (user.user) {
    return (
      <View style={styles.containerFacebook}>
        <View style={styles.backImageContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imgUser }} />
          </View>
        </View>
        <Text style={{ fontSize: 25, color: "black", marginVertical: 25 }}>
          {/* {'Name : '} */}
          {user.user.displayName}
        </Text>
        {/* uid */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>UID</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}>{user.user.providerData[0].uid}</Text>
          </View>
        </View>
        {/* email */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Email</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}>{user.user.email}</Text>
          </View>
        </View>
        {/* Address */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Address</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}></Text>
          </View>
        </View>
        {/* Birth */}
        <View style={styles.formDetail}>
          <Text style={{ color: "black", fontSize: 15 }}>Address</Text>
          <View style={styles.detailValue}>
            <View
              style={{ position: "relative", top: 2, marginRight: 10 }}
            ></View>
            <Text style={styles.textValue}> - </Text>
          </View>
        </View>

        <TouchableOpacity
        onPress={signOut}
        >
          <View style={styles.btnLogin}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
// providerData.user.uid
// fcb69f
const styles = StyleSheet.create({
  // facebook style
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
  // facebook style

  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 55,
    paddingTop: 100,
  },
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  loginWithContainer: {
    borderWidth: 2,
    padding: 15,
    borderColor: "#dfdfdf",
    borderRadius: 10,
    width: 330,
    marginVertical: 7,
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
  textInput: {
    width: "80%",
    height: 60,
    backgroundColor: "#ffff",
    margin: 10,
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#dfdfdf",
    paddingLeft: 45,
    color: "black",
  },
  iconUser: {
    position: "absolute",
    left: 60,
    bottom: 31,
  },
  iconPassword: {
    position: "absolute",
    left: 60,
    bottom: 48,
  },
  iconEye: {
    position: "absolute",
    right: -140,
    bottom: 27,
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
