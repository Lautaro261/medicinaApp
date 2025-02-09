import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";
import { AccountScreen } from "../screens/account/AccountScreen";

const Stack = createNativeStackNavigator();


export const AccountStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#D0B3F1', // Color de fondo global para todos los headers
      },
      headerTitleStyle: {
        color: '#FFFFFF', // Color del texto del título global
      }
    }}>

      <Stack.Screen name={screen.account.account} component={AccountScreen} options={{ title: "Cuenta" }}/>

      <Stack.Screen name={screen.account.login} component={LoginScreen} options={{ title: "Iniciar sesión" }}/>

      <Stack.Screen name={screen.account.register} component={RegisterScreen} options={{ title: "Crea tu cuenta" }}/>


    </Stack.Navigator>
  );
};
