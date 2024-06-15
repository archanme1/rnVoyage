import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { signIn } from "aws-amplify/auth";

const SignInScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignInPressed = async () => {
    try {
      setError("");
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        router.push("/feature9/protected");
      } else {
        setError("Sign in failed");
      }
    } catch (error) {
      console.log("error signing in", error);
      setError("Sign in failed");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@acme.com"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign in" onPress={onSignInPressed} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Link href={"/feature9/auth/signup"}>New here? Sign up</Link>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontFamily: "InterSemi",
    fontSize: 24,
    color: "dimgray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
