import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Text, ListItem, Icon } from "@rneui/themed";
import { map } from "lodash";
import { Map } from "../../shared/map/Map";

export const Info = (props) => {
  const { professional } = props;

  const listInfo = [
    {
      text: professional.address,
      iconType: "material-community",
      iconName: "google-maps",
      onPress: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${professional.location.latitude},${professional.location.longitude}`), // Abrir Google Maps
    },
    {
      text: professional.phone,
      iconType: "material-community",
      iconName: "cellphone-sound",
      onPress: () => Linking.openURL(`tel:${professional.phone}`), // Llamar al número
    },
    {
      text: professional.email,
      iconType: "material-community",
      iconName: "email-box",
      onPress: () => Linking.openURL(`mailto:${professional.email}`), // Enviar un correo
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el servicio</Text>
      <Map location={professional.location} name={professional.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider onPress={item.onPress}>
          <Icon type={item.iconType} name={item.iconName} color="#5c179b" size={30} /> {/* Aumentado el tamaño del icono */}
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
  //TODO: al presionar en los iconos, enviar a pantalla de mapa y llamar al telefono.