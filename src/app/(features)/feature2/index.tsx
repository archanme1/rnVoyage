import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FeatureTwo = () => {
  return (
    <View>
        <Stack.Screen options={{title: "Feature2"}}  />
      <Text>FeatureTwo</Text>
    </View>
  )
}

export default FeatureTwo