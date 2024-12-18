import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { professionalsRankingData } from '../../data/professionals-datos';
import { ProfessionalRanking } from '../components/Professionals/professionalRanking/ProfessionalRanking';

export const RankingScreen = () => {
  //const [restaurants, setRestaurants] = useState(null);

  const renderItem = ({ item, index }) => {
    return <ProfessionalRanking professional={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={professionalsRankingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});