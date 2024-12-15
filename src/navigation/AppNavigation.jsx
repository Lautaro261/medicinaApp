import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
// Todo Cambiar createStactNavigator por Tab
const Stack = createStackNavigator();

export const AppNavigation=()=>{
return(
    <Stack.Navigator initialRouteName="Register">
         <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
         <Stack.Screen name="Login"  component={LoginScreen} options={{headerShown:false}}/>
         <Stack.Screen name="Professionals" component={ProfessionalsScreen} options={{headerShown:false}}/>
         <Stack.Screen name="ProfessionalDetail" component={ProfessionalDetailsScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
)
};
