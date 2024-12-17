import { SearchBar } from '@rneui/themed';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const SearchScreen = () => {
  return (
    <>
    <SearchBar
    placeholder="Busca tu profesional"
    />

    <ScrollView>
        <Text>Hola</Text>
    </ScrollView>
    </>
  );
};
