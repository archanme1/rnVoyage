import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ApartmentListItem = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>ApartmentListItem</Text>
    </SafeAreaView>
  )
}

export default ApartmentListItem

const styles = StyleSheet.create({
    page: {
        position: 'absolute',
        bottom: 0,
    }
})