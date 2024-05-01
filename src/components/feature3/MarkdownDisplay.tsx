import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

import Markdown from 'react-native-markdown-display';
import { StatusBar } from 'expo-status-bar';


const MarkdownDisplay = ({children} : PropsWithChildren) => {

  return (
    <View style={styles.page}  >
        <StatusBar  />
      
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Markdown style={MarkdownStyles}>
                {children}
            </Markdown>
        </ScrollView>
    </View>
  )
}

export default MarkdownDisplay

const MarkdownStyles = StyleSheet.create({
    body: {},
    heading1: {
        fontSize: 24,
        color: "purple"
    }
})

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    }
})