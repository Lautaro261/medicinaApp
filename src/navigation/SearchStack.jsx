
import { SearchScreen } from '../screens/SearchScreen';
import { screen } from '../utils/ScreenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export const SearchStack = () => {
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
        name={screen.search.search}
        component={SearchScreen}
        options={{title: "Buscador"}}
        />

    </Stack.Navigator>
  );
};

