import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Stack } from 'expo-router'
import appartments from "@assets/data/feature5/dummy.json"
import CustomMarkerComponent from '@/components/feature5/CustomMarkerComponent'
import ApartmentListItem from '@/components/feature5/ApartmentListItem'

const MapScreen = () => {

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <View style={styles.container}>
        <Stack.Screen options={{headerShown: false}}/>

      <MapView style={styles.map}
        initialRegion={mapRegion}
        //provider={PROVIDER_GOOGLE}  
      >
        {
          appartments.map((apartment) => (
              <CustomMarkerComponent
              key={apartment.id}
              apartment={apartment}
              />
            )
          )
        }
      </MapView>
      <ApartmentListItem />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    }
  });