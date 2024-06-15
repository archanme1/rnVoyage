import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
// import {
//   withAuthenticator,
//   useAuthenticator,
// } from "@aws-amplify/ui-react-native";

const ProtectedLayout = () => {
  // const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  // if (authStatus !== "authenticated") {
  //   Redirect({ href: "/feature9/auth/signin" });
  // }

  return <Slot />;
};

// for prebuilt auth page from amplify
// export default withAuthenticator(ProtectedLayout);
export default ProtectedLayout;

const styles = StyleSheet.create({});
