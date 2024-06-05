import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { formatMillis, primary_color } from "@/app/lib";
import { AVPlaybackStatus, Audio } from "expo-av";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const MemoListItem = ({ uri }: { uri: string }) => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [status, setStatus] = useState<AVPlaybackStatus>();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { progressUpdateIntervalMillis: 100 },
      onPlaybackStatusUpdate
    );
    setSound(sound);

    if (status?.isLoaded && status?.isPlaying) {
      await sound.pauseAsync();
    } else {
      console.log("Playing Sound");
      await sound.playAsync();
    }
  }

  const onPlaybackStatusUpdate = (newStatus: AVPlaybackStatus) => {
    setStatus(newStatus);

    if (newStatus?.isLoaded && newStatus?.didJustFinish) {
      //do something like resetting the progress to 0
      setSound(undefined);
      setStatus(undefined);
    }
  };

  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded ? status.durationMillis : 1;

  let progress = position / (duration ?? 1);

  const isPlaying = status?.isLoaded ? status?.isPlaying : false;

  const animatedIndicaorStyle = useAnimatedStyle(() => {
    return {
      // something
      left: withTiming(`${progress * 100}%`, {
        duration: 200,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Text onPress={playSound}>{isPlaying ? "Pause" : "Play"}</Text>
      <View style={styles.playbackContainer}>
        <View style={styles.playbackBackground} />
        <Animated.View
          style={[styles.playbackIndicator, animatedIndicaorStyle]}
        />
        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            color: "gray",
            fontFamily: "Inter",
            fontSize: 12,
          }}
        >
          {formatMillis(position || 0)} / {formatMillis(duration || 0)}
        </Text>
      </View>
    </View>
  );
};

export default MemoListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  playbackContainer: {
    flex: 1,
    height: 80,
    justifyContent: "center",
  },
  playbackBackground: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackIndicator: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: primary_color,
    position: "absolute",
  },

  wave: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  waveLine: {
    flex: 1,
    height: 30,
    backgroundColor: "gainsboro",
    borderRadius: 20,
  },
});
