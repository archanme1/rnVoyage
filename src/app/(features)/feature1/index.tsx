import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FeatureOne = () => {
  return (
    <View>
      <Stack.Screen options={{title: "Feature1"}}  />
      <Text style={
        {
          color: '#9b4521',
          fontSize: 75,
          fontFamily: 'AmaticBold',
        }
      }>Setup RN app</Text>
      <Text style={
        {
          fontSize: 55,
          fontFamily: 'AmaticBold',
        }
      }>With:</Text>
      <Text style={
        {
          color: 'teal',
          fontSize: 35,
          fontFamily: 'AmaticBold',
        }
      }>Expo Router, TypeScript, Fonts, SplashScreen & Others...</Text>
    </View>
  )
}

export default FeatureOne