import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { RankingScreen } from "../screens/RankingScreen";

const Stack = createNativeStackNavigator();

export const RankingStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#D0B3F1', // Color de fondo global para todos los headers
      },
      headerTitleStyle: {
        color: '#FFFFFF', // Color del texto del título global
      }
    }}
    >

        <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{title: "Ranking"}}
        />

    </Stack.Navigator>
  );
};

