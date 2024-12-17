/* import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { Layout } from "@ui-kitten/components";

export function Carousel(props) {
  const { arrayImages, width, height, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    item ? (
      <Image source={{ uri: item }} style={{ height, width, borderRadius: 8 }} />
    ) : (
      <View style={{ height, width, borderRadius: 8, backgroundColor: 'gray' }} /> // Para manejar un caso en el que item sea undefined
    )
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <Layout style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 70,
    paddingBottom: 0,
  },
  dot: {
    backgroundColor: "#7B2CBF",
  },
});
 */

/* import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CarouselSnap from "react-native-snap-carousel";
//import { Image } from "react-native-elements";

const arrayImages = ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"]

export const Carousel = (props) => {
  //const { arrayImages } = props;
  const width = Dimensions.get("window").width; // Usamos el ancho de la ventana
  const height = 200; // Definimos una altura fija para las imágenes

  const renderItem = ({ item }) => (
    <View>
        <Image source={{ uri: item }} style={{ height, width, borderRadius: 8 }} />
    </View>
  );

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
  },
});
 */


import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CarouselSnap from "react-native-snap-carousel";

const arrayImages = ["item1", "item2", "item3"]; // Los elementos pueden ser cualquier valor, ya que no los estamos usando para imágenes.

export const Carousel = (props) => {
  const width = Dimensions.get("window").width; // Usamos el ancho de la ventana
  const height = 200; // Definimos una altura fija para las vistas

  const renderItem = ({ item }) => (
    <View style={[styles.box, { backgroundColor: getRandomColor() }]}>
      <View style={styles.innerBox}>
        <View />
      </View>
    </View>
  );

  

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "relative",
  },
  box: {
    height: 200,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    backgroundColor: "#fff",
    height: 100,
    width: 100,
    borderRadius: 8,
  },
});

function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF9A33'];
  return colors[Math.floor(Math.random() * colors.length)];
}
