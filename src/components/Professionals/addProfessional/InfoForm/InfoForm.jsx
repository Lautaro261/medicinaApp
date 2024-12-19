
import { StyleSheet, Text, View } from 'react-native';
//import { Layout, Input } from '@ui-kitten/components';

import React, { useState } from "react";
import { Input } from "@rneui/themed";
import { MapForm } from '../mapForm/MapForm';

export function InfoForm(props) {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Titulo del Servicio"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Dirección"
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion del servicio"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});


/* const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3EAFB', // Fondo coherente con el tema
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#D0B3F1',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
}); */