import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const FeatureFive = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.page} >
        <Stack.Screen options={{title: "6-tinder"}}  />

        <Link href="/feature6/tinder" asChild>
            <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Direct to Tinder Swipe Page</Text>
            </Pressable>
        </Link>
    </SafeAreaView>
  )
}

export default FeatureFive;

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
        color: "#7e9e7b",
        padding: 20,
        fontFamily: "Inter",
    },
})