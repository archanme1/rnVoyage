import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
// import { useAuthenticator } from "@aws-amplify/ui-react-native";

const AuthLayout = () => {
  // const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  // if (authStatus === "authenticated") {
  //   Redirect({ href: "/feature9/protected" });
  // }
  return <Slot />;
};

export default AuthLayout;

const styles = StyleSheet.create({});
