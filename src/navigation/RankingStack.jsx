import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { RankingScreen } from "../screens/RankingScreen";

const Stack = createNativeStackNavigator();

export const RankingStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{title: "Ranking"}}
        />
    </Stack.Navigator>
  );
};

