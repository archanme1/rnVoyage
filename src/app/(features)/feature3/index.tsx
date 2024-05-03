import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MarkdownDisplay from '@/components/feature3/MarkdownDisplay';

const markdownContent = `
# 🎉 Test with Markdown!

## 🚀 Custom Component Benefit

Welcome to this test and exciting markdown guide! Used a custom compoent benfit in Markdown approach where we pass component as a child to parent component!
    `;

const FeatureThree = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.page} >
        <Stack.Screen options={{title: "2-Markdown"}}  />

        <MarkdownDisplay>
            {markdownContent}
        </MarkdownDisplay>

        <Link href="/feature3/editor" asChild>
            <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Markdown Editor</Text>
            </Pressable>
        </Link>
    </SafeAreaView>
  )
}

export default FeatureThree

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