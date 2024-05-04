import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const CustomMarkerComponent = ({
  apartment, onPress
}: {
  apartment: {
    latitude: number;
    longitude: number;
    price: number;
    title: string;
  },
  onPress: () => void;
}) => {
  const { latitude, longitude, price } = apartment;

  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onPress={onPress}
    >
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarkerComponent;

const styles = StyleSheet.create({
  priceContainer: {
    backgroundColor: "#32572f",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 50,
  },
  price: {
    color: "#7e9e7b",
    fontSize: 12,
    fontFamily: "Inter",
  },
});
