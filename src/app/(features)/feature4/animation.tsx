import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native";

const Animation = () => {
    const animationRef = useRef<LottieView>(null)
  return (
    <SafeAreaView style={styles.page}>
        <Stack.Screen options={{headerShown: false}}  />
      <Text style={styles.text}>Lottie Animation</Text>
      <LottieView
        source={require("@assets/lottie/RNVoyage.json")}
        style={styles.lottieStyle}
        ref={animationRef}
        autoPlay
        />

        {/* <Button title="Play" onPress={() => animationRef.current?.play()} />
        <Button title="Pause" onPress={() => animationRef.current?.pause()} />
        <Button title="Reset" onPress={() => animationRef.current?.reset()} /> */}

    </SafeAreaView>
  )
}

export default Animation

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
    },
    text: {
        color: "#7e9e7b",
        fontFamily: "Amatic",
        fontSize: 20,
        marginBottom: 20,
    },
    lottieStyle: {
         width: "80%",
         maxWidth: 400,
    }
})