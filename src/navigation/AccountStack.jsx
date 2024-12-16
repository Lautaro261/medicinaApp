import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";

const Stack = createNativeStackNavigator();


export const AccountStack = () => {
    //Todo Falta agregar AccountScreen
  return (
    <Stack.Navigator>

        
        <Stack.Screen name={screen.account.login} component={LoginScreen}/>

        <Stack.Screen name={screen.account.register} component={RegisterScreen}/>

    </Stack.Navigator>
  );
};
