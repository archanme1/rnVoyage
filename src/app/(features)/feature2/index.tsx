import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const FeatureTwo = () => {
  return (
    <View style={styles.page}>
        <Stack.Screen options={{title: "1-Onboard"}}  />
      <Link href="/feature2/onboard" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Onboarding</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default FeatureTwo

const styles = StyleSheet.create({
  page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
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