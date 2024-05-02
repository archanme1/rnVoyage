import {  StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from "lottie-react-native";

const SplashScreenAnimate = ({onAnimationFinish=(isCancelled)=> {}}:  {onAnimationFinish: (isCancelled: boolean) => void}) => {
  return (
    <View style={styles.page}>
      <LottieView
        source={require("@assets/lottie/RNVoyage.json")}
        style={styles.lottieStyle}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  )
}

export default SplashScreenAnimate 

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
    },
    lottieStyle: {
         width: "80%",
         maxWidth: 400,
    }
})