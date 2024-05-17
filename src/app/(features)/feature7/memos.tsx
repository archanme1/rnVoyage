import { useState } from 'react';
import { View, StyleSheet, Button, FlatList, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Stack } from 'expo-router';
import { Recording } from 'expo-av/build/Audio';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import MemoListItem from '@/components/feature7/MemoListItem';

export default function Memos() {
  const [recording, setRecording] = useState<Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [memos, setMemos] = useState<String[]>([]);
  const metering = useSharedValue(-100);

  async function startRecording() {
    if(!permissionResponse) return
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if(!recording) return 
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    // console.log('Recording stopped and stored at', uri);
    if(uri) {
        setMemos((prev)=> [...prev, uri])
    }
  }

const animatedRedCircle = useAnimatedStyle(() => {
    return {
        width: withTiming(recording ? '60%' : '100%'),
        borderRadius: withTiming(recording ? 5 : 35),
    }
})


  return (
    <View style={styles.container}>
        <Stack.Screen options={{headerShown: false}} />
        
        <FlatList data={memos} renderItem={({item})=> <MemoListItem url={item} />} />
       
        <View style={styles.footer}>
        <View>
          <Pressable
            style={styles.recordButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <Animated.View style={[styles.redCircle, animatedRedCircle]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  footer: {
    backgroundColor: 'white',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,

    borderWidth: 3,
    borderColor: '#32572f',
    padding: 3,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  redCircle: {
    backgroundColor: '#7e9e7b',
    aspectRatio: 1,
  },
});
