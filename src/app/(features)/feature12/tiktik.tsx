import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { secondary_color } from "@/app/lib";
import SingleVIdeoFIle from "@/components/feature12/SingleVIdeoFIle";

const dummyPosts = [
  {
    id: "2",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    caption: "Caption of the post",
  },
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
    caption: "Hey there",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
    caption: "Hola",
  },
  {
    id: "4",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4",
    caption: "Piano practice",
  },
  {
    id: "5",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4",
    caption: "Hello World!",
  },
];

const Tiktok = () => {
  const [activePost, setActivePost] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState(dummyPosts);

  const onViewableItemsChanged = useCallback(
    ({ changed, viewableItems }: { changed: any; viewableItems: any[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setActivePost(viewableItems[0].item.id);
      }
    },
    [activePost]
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  const doSomethignWhenEndReached = () => {
    console.warn("fetching same post as a loop");
    setPosts((prev) => [...prev, ...dummyPosts]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <SingleVIdeoFIle post={item} currentActivePost={activePost} />
        )}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        onEndReached={doSomethignWhenEndReached}
      />
    </View>
  );
};

export default Tiktok;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondary_color,
  },
});
