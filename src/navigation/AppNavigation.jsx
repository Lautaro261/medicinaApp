import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
import { screen } from '../utils/ScreenName';
import { ProfessionalStack } from "./ProfessionalStack";
import { AccountStack } from "./AccountStack";

//const Stack = createStackNavigator();
// Todo Cambiar createStactNavigator por Tab
const Tab = createBottomTabNavigator();

export const AppNavigation=()=>{
return(
    <Tab.Navigator
    screenOptions={({route})=>({
        headerShown: false,
        tabBarActiveTintColor: "#5A189A",//color de bar verde (seleccionado)
        tabBarInactiveTintColor: "#646464", // color de bar negro (no seleccionado)
    })}
    //initialRouteName="Register"
    >
        <Tab.Screen name={screen.professional.tab} component={ProfessionalStack} options={{title:"Profesionales"}}/>
        <Tab.Screen name={screen.account.tab} component={AccountStack} options={{title: "Cuenta"}}/>





         {/* <Tab.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="Login"  component={LoginScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="Professionals" component={ProfessionalsScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="ProfessionalDetail" component={ProfessionalDetailsScreen} options={{headerShown:false}}/> */}
    
    
    </Tab.Navigator>
)
};
