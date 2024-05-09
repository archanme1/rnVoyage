import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Stack } from "expo-router";
import appartments from "@assets/data/feature5/dummy.json";
import CustomMarkerComponent from "@/components/feature5/CustomMarkerComponent";
import ApartmentListItem from "@/components/feature5/ApartmentListItem";
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { FlatList } from "react-native-gesture-handler";

const MapScreen = () => {
  const [selectedApartment, setSelectedApartment] = useState<{
    id: number;
    latitude: number;
    longitude: number;
    price: number;
    title: string;
    numberOfStars: number;
    rating: number;
    image: string;
  } | null>(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const snapPoints = useMemo(() => [75, '25%', '50%', '75%'], []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        style={styles.map}
        region={mapRegion}
        //provider={PROVIDER_GOOGLE}
      >
        {appartments.map((apartment) => (
          <CustomMarkerComponent
            key={apartment.id}
            apartment={apartment}
            onPress={() => setSelectedApartment(apartment)}
          />
        ))}
      </MapView>
      {selectedApartment && (
        <ApartmentListItem
          apartment={selectedApartment}
          onPress={() => setSelectedApartment(null)}
          containerStyle={styles.containerStyle}
        />
      )}

      <BottomSheet index={0} snapPoints={snapPoints}
      //  enablePanDownToClose
       >
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over {appartments.length} places</Text>
          {/* replacing with FlatList as it detect current scrollable ref  */}
          <BottomSheetFlatList
            data={appartments}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <ApartmentListItem apartment={item} onPress={() => setSelectedApartment(null)} close={true} />}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  containerStyle: { position: "absolute", bottom: 100, right: 10, left: 10 }
});
