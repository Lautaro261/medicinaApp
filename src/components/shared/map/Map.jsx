import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";

export const Map = (props)=> {
  const { location, name } = props;
  console.log(location)

  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };

  return (
    <MapView
      style={styles.content}
      initialRegion={location}
      onPress={openAppMap}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}

 const styles = StyleSheet.create({
    content: {
      height: 130,
      width: "100%",
    },
  });
  