import { Slot } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useBiometric } from "@/components/feature10/BiometricProvidder";

export default function ProtectedLayout() {
  const { hasBiometrics, authenticatePerson } = useBiometric();

  useEffect(() => {
    if (!hasBiometrics) {
      authenticatePerson();
    }
  }, []);

  if (!hasBiometrics) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontFamily: "Inter", fontSize: 20, marginBottom: 20 }}>
          Use FaceId to Unlock
        </Text>
        <Button title="Authenticate" onPress={authenticatePerson} />
      </View>
    );
  }

  return <Slot />;
}
