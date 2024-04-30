import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const FeatureTwo = () => {
  return (
    <View style={styles.page}>
        <Stack.Screen options={{title: "1-Onboard"}}  />
      <Text>FeatureTwo</Text>
      <Link href="/feature2/onboard" asChild>
        <Button title='Click here to Proceed to Onboarding' />
      </Link>
    </View>
  )
}

export default FeatureTwo

const styles = StyleSheet.create({
  page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
})