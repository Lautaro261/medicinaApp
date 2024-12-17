
import { SearchScreen } from '../screens/SearchScreen';
import { screen } from '../utils/ScreenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export const SearchStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name={screen.search.search}
        component={SearchScreen}
        options={{title: "Buscador"}}
        />
    </Stack.Navigator>
  );
};

