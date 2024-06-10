import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Location from "expo-location";
import { primary_color, secondary_color } from "@/app/lib";
import ForecastItem from "@/components/feature8/ForecastItem";
import LottieView from "lottie-react-native";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const BASE_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const UNIT_TO_FETCH = "metric";
const dummyImage =
  "https://images.pexels.com/photos/6855049/pexels-photo-6855049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

type MainWeatherType = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type WeatherType = {
  name: string;
  main: MainWeatherType;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type ForecastType = {
  main: MainWeatherType;
  dt: number;
};

const Weather = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<WeatherType>();
  const [forecast, setForecast] = useState<ForecastType[]>([]);
  // if Dont want define object as state type then we can just keep it blank like this
  // {
  //     name: "",
  //     main: {
  //     temp: 0,
  //     feels_like: 0,
  //     temp_min: 0,
  //     temp_max: 0,
  //     pressure: 0,
  //     humidity: 0,
  //     sea_level: 0,
  //     grnd_level: 0
  //     }
  // }
  const fetchData = async () => {
    if (!location) return;

    const { latitude, longitude } = location.coords;

    const res = await fetch(
      `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=${UNIT_TO_FETCH}`
    );
    const data = await await res.json();
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) return;

    const { latitude, longitude } = location.coords;

    const res = await fetch(
      `${BASE_URL_FORECAST}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=${UNIT_TO_FETCH}`
    );
    const data = await await res.json();
    setForecast(data.list);
  };

  useEffect(() => {
    fetchData();
    fetchForecast();
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  //   console.log("location", JSON.stringify(location, null, 2));
  console.log("weather", JSON.stringify(weather, null, 2));
  //   console.log("forecast", JSON.stringify(forecast, null, 2));

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground
      source={{
        uri: dummyImage,
      }}
      style={styles.container}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      />

      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.wrapper}>
        <LottieView
          source={
            weather?.weather[0].main !== ("Rain" || "Clouds")
              ? // file name is different in rain and sun
                require("@assets/lottie/rain.json")
              : require("@assets/lottie/sun.json")
          }
          style={{
            width: 200,
            aspectRatio: 1,
          }}
          autoPlay
          loop
        />
        <Text style={styles.location}>📍{weather?.name}</Text>
        <Text style={styles.temp}>{Math.round(weather?.main.temp ?? 0)}℃</Text>
      </View>
      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <ForecastItem forecast={item} />;
        }}
        style={{
          flexGrow: 0,
          height: 150,
          marginBottom: 40,
        }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        keyExtractor={(item) => item.dt.toString()}
      />
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  temp: {
    fontSize: 72,
    fontWeight: "bold",
    color: secondary_color,
  },
  location: {
    fontSize: 32,
    color: "white",
    letterSpacing: -2,
  },
});
