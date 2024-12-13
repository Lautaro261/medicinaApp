import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";

// Todo Cambiar createStactNavigator por Tab
const Stack = createStackNavigator();

export const AppNavigation=()=>{
return(
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"  component={LoginScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
)
};
