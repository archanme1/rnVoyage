import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MarkdownDisplay from '@/components/feature3/MarkdownDisplay';

const markdownContent = `
# 🎉 Splashing Screen!

Welcome to this Splashing Screen Animation with Lottie!
    `;

const FeatureFour = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.page} >
        <Stack.Screen options={{title: "4-SplashScreen"}}  />

        <MarkdownDisplay>
            {markdownContent}
        </MarkdownDisplay>

        <Link href="/feature4/animation" asChild>
            <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Splashing Screen Animation</Text>
            </Pressable>
        </Link>
    </SafeAreaView>
  )
}

export default FeatureFour;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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