import { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { Recording } from "expo-av/build/Audio";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MemoListItem from "@/components/feature7/MemoListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { primary_color, secondary_color } from "@/app/lib";

export default function Memos() {
  const [recording, setRecording] = useState<Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [memos, setMemos] = useState<string[]>([]);
  const metering = useSharedValue(-100);

  async function startRecording() {
    if (!permissionResponse) return;
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        undefined,
        1000 / 60
      );
      setRecording(recording);
      console.log("Recording started");

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          metering.value = status.metering || -100;
        }
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    // console.log('Recording stopped and stored at', uri);
    if (uri) {
      setMemos((prev) => [...prev, uri]);
    }
  }

  const animatedGreenCircle = useAnimatedStyle(() => {
    return {
      width: withTiming(recording ? "60%" : "100%"),
      borderRadius: withTiming(recording ? 5 : 35),
    };
  });

  const animatedWavesRecord = useAnimatedStyle(() => {
    const size = withTiming(
      interpolate(metering.value, [-160, -50, 0], [0, 0, -50], {
        // extrapolateRight: Extrapolation.CLAMP,
      }),
      { duration: 100 }
    );

    return {
      top: size,
      bottom: size,
      left: size,
      right: size,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem uri={item} />}
      />

      <View style={styles.footer}>
        <View>
          <Pressable
            style={styles.recordButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <Animated.View style={[styles.GreenCircle, animatedGreenCircle]} />
          </Pressable>
          <Animated.View style={[styles.recordWaves, animatedWavesRecord]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  footer: {
    backgroundColor: "white",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: primary_color,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 1,
  },
  recordWaves: {
    backgroundColor: secondary_color,
    opacity: 0.3,
    position: "absolute",
    borderRadius: 50,
  },
  waveformCss: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  GreenCircle: {
    backgroundColor: secondary_color,
    aspectRatio: 1,
  },
});
