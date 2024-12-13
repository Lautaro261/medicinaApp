import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";

// Todo Cambiar createStactNavigator por Tab
const Stack = createStackNavigator();

export const AppNavigation=()=>{
return(
    <Stack.Navigator initialRouteName="Login">
         <Stack.Screen name="Login"  component={LoginScreen} options={{headerShown:false}}/> 
        {/* <Stack.Screen name="Register"  component={RegisterScreen} options={{headerShown:false}}/> */}
    </Stack.Navigator>
)
};
