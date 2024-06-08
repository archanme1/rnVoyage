import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  background_color,
  formatMillis,
  primary_color,
  secondary_color,
} from "@/app/lib";
import { AVPlaybackStatus, Audio } from "expo-av";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export type Memo = {
  uri: string;
  metering: number[];
};

const MemoListItem = ({ memo }: { memo: Memo }) => {
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
      { uri: memo.uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
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

  // const animatedIndicaorStyle = useAnimatedStyle(() => {
  //   return {
  //     // something
  //     left: withTiming(`${progress * 100}%`, {
  //       duration: 200,
  //     }),
  //   };
  // });

  console.log("memo metering length", memo.metering.length);

  let numLines = 50;
  let lines = [];

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * memo.metering.length) / numLines);
    console.log("meteringIndex", meteringIndex);

    const nextMeteringIndex = Math.ceil(
      ((i + 1) * memo.metering.length) / numLines
    );

    console.log("nextMeteringIndex", nextMeteringIndex);
    const values = memo.metering.slice(meteringIndex, nextMeteringIndex);
    console.log("values", values);

    const average = values.reduce((sum, a) => sum + a, 0) / values.length;
    console.log("average", average);

    // lines.push(memo.metering[meteringIndex]);
    lines.push(average);
  }

  console.log("lines", lines);

  return (
    <View style={styles.container}>
      <Text onPress={playSound}>{isPlaying ? "Stop " : "Play"}</Text>
      <View style={styles.playbackContainer}>
        {/* <View style={styles.playbackBackground} /> */}
        <View style={styles.wave}>
          {lines.map((meter, index) => {
            // console.log("meter", meter);

            return (
              <View
                style={[
                  styles.waveLine,
                  {
                    height: interpolate(meter, [-50, 0], [5, 50], {
                      extrapolateRight: "clamp",
                    }),
                    backgroundColor:
                      progress > index / memo.metering.length
                        ? primary_color
                        : secondary_color,
                  },
                ]}
                key={index}
              />
            );
          })}
        </View>
        {/* <Animated.View
          style={[styles.playbackIndicator, animatedIndicaorStyle]}
        /> */}
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
    backgroundColor: background_color,
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
    opacity: 0.3,
    borderRadius: 20,
  },
});
