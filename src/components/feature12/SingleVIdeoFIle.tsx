import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type SingleVIdeoFIleProps = {
  post: {
    id: string;
    video: string;
    caption: string;
  };
  currentActivePost: string;
};

const SingleVIdeoFIle = ({ post, currentActivePost }: SingleVIdeoFIleProps) => {
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const video = useRef<Video>(null);
  const { height } = useWindowDimensions();

  const onPress = () => {
    if (!video) return;

    const isPlaying = status?.isLoaded && status?.isPlaying;

    if (!isPlaying) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  };

  useEffect(() => {
    if (!video) return;

    if (currentActivePost === post.id) {
      video.current?.playAsync();
    }
    if (currentActivePost !== post.id) {
      video.current?.pauseAsync();
    }
  }, [currentActivePost]);

  return (
    <View style={[styles.container, { height }]}>
      <Video
        ref={video}
        source={{
          uri: post.video,
        }}
        style={[StyleSheet.absoluteFillObject, styles.video]}
        resizeMode={ResizeMode.COVER}
        useNativeControls
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        isLooping
      />

      <Pressable onPress={onPress} style={styles.content}>
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />

        <SafeAreaView style={[styles.content]}>
          <View style={styles.header}>
            <Button
              title={status?.isLoaded && status.isPlaying ? "" : "Play"}
              onPress={() =>
                status?.isLoaded && status.isPlaying
                  ? video.current?.pauseAsync()
                  : video.current?.playAsync()
              }
              color="white"
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.leftColumn}>
              <Text style={styles.caption}>{post.caption}</Text>
              {/* <Text
                style={[styles.caption, { maxWidth: "70%", color: "gray" }]}
              >
                {post.desc}
              </Text> */}
            </View>
            <View style={styles.rightColumn}>
              <Text style={[styles.caption, { fontWeight: "bold" }]}>
                ADD ICON
              </Text>
              <Text style={styles.caption}>Like</Text>
              <Text style={styles.caption}>Comment</Text>
              <Text style={styles.caption}>Share</Text>
              <Text style={styles.caption}>Bookmark</Text>
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

export default SingleVIdeoFIle;

const styles = StyleSheet.create({
  container: {},
  video: {},
  content: { flex: 1 },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    gap: 20,
    alignItems: "flex-end",
  },
  caption: {
    color: "white",
    fontSize: 14,
  },
  overlay: {
    top: "50%",
  },
  header: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 1,
  },
});
