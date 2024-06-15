import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { primary_color } from "@/app/lib";
// import { useAuthenticator } from "@aws-amplify/ui-react-native";
// import { signOut } from "aws-amplify/auth";

const ProtectedScreen = () => {
  //   const { signOut } = useAuthenticator(userSelector);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 30 }}>Hello there</Text>
      <Text style={{ fontSize: 20, color: primary_color }}>
        You should see this page only if you are Authenticated
      </Text>
      <Button
        title="Sign Out"
        onPress={() => {
          // signOut();
          console.log("signOut();");
        }}
      />
    </View>
  );
};

export default ProtectedScreen;

const styles = StyleSheet.create({});
