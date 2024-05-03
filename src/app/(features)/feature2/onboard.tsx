import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, LightSpeedInRight, LightSpeedOutLeft, LightSpeedOutRight, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const onboardingSteps = [
    {
      icon: 'snowflake',
      title: 'Welcome User',
      description: 'Exploring expo jungle for React Native Expedition',
    },
    {
      icon: 'people-arrows',
      title: 'Learn and grow',
      description: 'Learn by building may projects with React Native and Expo',
    },
    {
      icon: 'book-reader',
      title: 'Education',
      description:
        'This is Self Education for Archan Bhatta to learn and grow with React Native and Expo.',
    },
  ];

const OnBoard = () => {
    const [stepIndex, setStepIndex] = React.useState(0);

    const initialData = onboardingSteps[stepIndex];


    const onContinue = () => {
        if(stepIndex < onboardingSteps.length -1){
            setStepIndex(stepIndex + 1)
        } else {
            endBoarding();
        }
    }

    const onBack = () => {
        if(stepIndex > 0){
            setStepIndex(stepIndex - 1)
        } else {
            endBoarding();
        }
    }

    const onSkip = () => {
        endBoarding();
    }

    const endBoarding = () => {
        setStepIndex(0)
        router.back();
    }

    const rightSwipe = Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue);
    const leftSwipe = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);

    const swipes = Gesture.Simultaneous(rightSwipe, leftSwipe);

  return (
    <SafeAreaView style={styles.page}>
        <Stack.Screen options={{headerShown: false}}  />
        <StatusBar barStyle="light-content" />

        <GestureDetector gesture={swipes}>
            <Animated.View style={styles.pageContent} entering={LightSpeedInRight} exiting={LightSpeedOutRight} key={stepIndex}>
                <FontAwesome5 name={initialData.icon} size={70} color= "#CEF202" />
                <View style={styles.textFooter}>
                    <Text style={styles.title}>{initialData.title}</Text>

                    <Animated.Text   style={styles.description} entering={SlideInRight.delay(300).easing(Easing.ease)} exiting={SlideOutLeft}> {initialData.description}</Animated.Text>
                </View>
            </Animated.View>
        </GestureDetector>
        <View style={styles.buttonRow}>
               {(stepIndex !== (onboardingSteps.length - 1)) &&
                <Text onPress={onSkip} style={styles.buttonText}>Skip</Text>
                }
            <Pressable onPress={onContinue} style={styles.button}>
                <Text style={styles.buttonText}>
                    {(stepIndex !== (onboardingSteps.length - 1)) ? "Next" : "Continue" }
                </Text>
            </Pressable>
        </View>
        <View style={styles.StepIndicatorContainer}>
            {onboardingSteps.map((_, index) => (
                <View key={index} style={[styles.StepIndicator, {backgroundColor: index === stepIndex ? "#32572f" : "gray"}]}></View>
            ))}
        </View>
    </SafeAreaView>
  )
}

export default OnBoard

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#15141A",
    },
    StepIndicatorContainer:{
        padding: 20,
        flexDirection: 'row',
        gap: 10,
    },
    StepIndicator:{
        flex: 1,
        alignItems: 'center',
        height: 3,
        backgroundColor: "#32572f",
    },
    pageContent: {
        padding: 20,
        gap: 20,
    },
    image: {
    },
    textFooter: {
        marginTop: "auto",
    },
    title: {
        color: "#FDFDFD",
        fontSize: 30,
        fontFamily: "InterMBold",
        letterSpacing: 5,
        marginVertical: 20,

    },
    description: {
    color: "#FDFDFD",
    fontSize: 20,
    fontFamily: "Amatic"
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        width: "100%",
    },
    button: {
        backgroundColor: "#32572f",
        borderRadius: 50,
        alignItems: 'center',
        width: "75%",
    },
    buttonText: {
        color: "#7e9e7b",
        padding: 20,
        fontFamily: "Inter",
    },
})