import { useState } from 'react';
import { Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import MarkdownDisplay from '@/components/feature3/MarkdownDisplay';

const copy = `
# 🎉 Hello World!

Get Started With Markdown!

`;

const EditorScreen = () => {
    const [text, setText] = useState(copy)
    const [mode, setMode] = useState('edit')

  return (
      <View style={styles.page}>
        <Stack.Screen options={{title: ""}} />

        <View style={styles.tabsContainer}>
                <Pressable onPress={()=> setMode("edit")} style={[styles.tab, { backgroundColor: mode === "edit" ? "#32572f" : "#6f966c" }]}>
                    <Text style={styles.tabText}>Edit</Text>
                </Pressable>
                <Pressable onPress={()=> setMode("preview")} style={[styles.tab, { backgroundColor: mode === "preview" ? "#32572f" : "#6f966c" }]}>
                    <Text style={styles.tabText}>Preview</Text>
                </Pressable>
        </View>

        {
            mode === 'edit' ? (
                <TextInput style={styles.input} value={text} multiline onChangeText={setText} />
            ) : (
                <MarkdownDisplay>
                    {text}
                </MarkdownDisplay>
            )
        }
       
      </View>
  )
}

export default EditorScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E5E5E5',
    },
    tabsContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#32572f',
    },
    tabText: {
        color: '#7e9e7b',
        fontFamily: 'Inter',
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
    }
})