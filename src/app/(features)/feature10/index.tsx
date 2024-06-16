import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { primary_color, secondary_color } from "@/app/lib";
import { Link, Stack } from "expo-router";

const BiometricsScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ title: "10-Biometrics" }} />

      <Link href="/feature10/protected" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>ProtectedBiometricScreen</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default BiometricsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: primary_color,
    borderRadius: 50,
    alignItems: "center",
    width: "75%",
  },
  buttonText: {
    color: secondary_color,
    padding: 20,
    fontFamily: "Inter",
  },
});
