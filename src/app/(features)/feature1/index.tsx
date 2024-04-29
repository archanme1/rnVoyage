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
      }>FeatureOne</Text>
    </View>
  )
}

export default FeatureOne