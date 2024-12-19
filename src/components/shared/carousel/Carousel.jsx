import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "@rneui/themed";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";


export const Carousel = (props)=> {
  const { arrayImages, width, height, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 70,
          paddingBottom: 0,
        }}
        dotStyle={{
          backgroundColor: "#000000",
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />

      {!hideDots && pagination()}
    </View>
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
    backgroundColor: "#00a680",
  },
});