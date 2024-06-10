import React from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";

import { ForecastType } from "@/app/(features)/feature8/weather";
import { primary_color, secondary_color } from "@/app/lib";

type ForecastTypeProps = { forecast: ForecastType };

const ForecastItem = ({ forecast }: ForecastTypeProps) => {
  //   console.log("forecast child", forecast);
  return (
    <BlurView intensity={100} style={styles.container}>
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}℃</Text>
      <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("ddd ha")}
      </Text>
    </BlurView>
  );
};

export default ForecastItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 3 / 4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: primary_color,
    borderWidth: StyleSheet.hairlineWidth,
    // if we want to use blurView, we should remove background color
    // here will be the background color as it looks good
    backgroundColor: secondary_color,
    borderRadius: 10,
  },
  temp: {
    fontSize: 35,
    fontWeight: "bold",
    color: primary_color,
    marginVertical: 10,
  },
  date: {
    color: primary_color,
  },
});
