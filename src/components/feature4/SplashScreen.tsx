import {  StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from "lottie-react-native";
import Animated, { ZoomOut } from 'react-native-reanimated';

const SplashScreenAnimate = ({onAnimationFinish=(isCancelled)=> {}}:  {onAnimationFinish: (isCancelled: boolean) => void}) => {

  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  return (
    <View style={styles.page}>
      <AnimatedLottieView
        source={require("@assets/lottie/RNVoyage.json")}
        style={styles.lottieStyle}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        exiting={ZoomOut}
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