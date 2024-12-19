import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "@rneui/themed";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../components/shared/loading/Loading";
import { db } from "../utils/firebase";
import { screen } from "../utils/ScreenName";

export const SearchScreen=()=> {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "professionals"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);

  const goToProfessional = (idProfessional) => {
    navigation.navigate(screen.professional.tab, {
      screen: screen.professional.professional,
      params: {
        id: idProfessional,
      },
    });
  };

  return (

    <View style={styles.container}>

      <SearchBar
        placeholder="Busca tu Servicio"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        containerStyle={styles.searchBarContainer} // Cambiar color de fondo
        inputStyle={styles.searchBarInput} // Cambiar color de texto
        placeholderStyle={styles.searchBarPlaceholder} // Cambiar color del placeholder
        />

      {!searchResults && <Loading show text="Cargando ..." />}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data();
            
            return (
              <ListItem
              key={data.id}
              bottomDivider
              onPress={() => goToProfessional(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EAFB", // Color de fondo para todo el componente
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});