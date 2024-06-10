import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Voice Memos
Work with the Microphone and Audoio playback`;

const Feature7 = () => {
  // if I want to go dorectly to the weather page
  //   const router = useRouter();

  //   useEffect(() => {
  //     router.replace("/feature8/weather");
  //   }, []);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.page}>
      <Stack.Screen options={{ title: "Feature 8: Weather" }} />

      <Link href="/feature8/weather" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Direct to Weather Page</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Feature7;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#32572f",
    borderRadius: 50,
    alignItems: "center",
    width: "75%",
  },
  buttonText: {
    color: "#7e9e7b",
    padding: 20,
    fontFamily: "Inter",
  },
});
