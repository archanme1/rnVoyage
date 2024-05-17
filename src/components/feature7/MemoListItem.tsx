import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MemoListItem = ({url}: {url: string}) => {
  return (
    <View>
      <Text>{url}</Text>
    </View>
  )
}

export default MemoListItem

const styles = StyleSheet.create({})