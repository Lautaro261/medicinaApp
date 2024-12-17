import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Image } from '@rneui/themed';


const widthScreen = Dimensions.get("window").width;

export const ImageProfessional = () => {
  return (
    <View style={styles.container}>
        <Image
        source={require("../../../../../assets/img/image-not-found.jpg")}
        style={styles.image}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image:{
    height: 200,
    width: widthScreen,
  }
});