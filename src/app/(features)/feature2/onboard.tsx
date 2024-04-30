import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


const onboardingSteps = [
    {
      icon: 'snowflake',
      title: 'Welcome User',
      description: 'Exploring expo jungle for React Native Expedition',
    },
    {
      icon: 'people-arrows',
      title: 'Learn and grow together',
      description: 'Learn by building may projects with React Native and Expo',
    },
    {
      icon: 'book-reader',
      title: 'Education for Archan Bhatta',
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

    const onSkip = () => {
        endBoarding();
    }

    const endBoarding = () => {
        setStepIndex(0)
        router.back();
    }

  return (
    <SafeAreaView style={styles.page}>
        <Stack.Screen options={{headerShown: false}}  />
        <StatusBar barStyle="light-content" />

        <View style={styles.pageContent}>

            <FontAwesome5 name={initialData.icon} size={70} color= "#CEF202" />

            <View style={styles.textFooter}>
                <Text style={styles.title}>{initialData.title}</Text>

                <Text style={styles.description}>{initialData.description}</Text>
            </View>
        </View>
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
        color: "#CEF202",
        padding: 20,
        fontFamily: "Inter",
    },
})