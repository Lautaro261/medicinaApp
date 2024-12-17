import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "../screens/account/loginScreen/LoginScreen";
import { RegisterScreen } from "../screens/account/registerScreen/RegisterScreen";
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
import { screen } from '../utils/ScreenName';
import { ProfessionalStack } from "./ProfessionalStack";
import { AccountStack } from "./AccountStack";
import { SearchStack } from "./SearchStack";
import { Icon } from "@ui-kitten/components";
import { RankingStack } from "./RankingStack";

//const Stack = createStackNavigator();
// Todo Cambiar createStactNavigator por Tab
const Tab = createBottomTabNavigator();

export const AppNavigation=()=>{
    
return(
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarActiveTintColor: "#5A189A",
          tabBarInactiveTintColor: "#646464",
          tabBarIcon: ({ color, size }) => {
            return screenOptions(route, color, size);
          },
          tabBarLabelStyle: {
            fontSize: 14,  // Tamaño del texto
            //fontWeight:'bold'
            //paddingBottom: 5,  // Espaciado entre el texto y el ícono (opcional)
          },
          tabBarStyle: {
            height: 70,  // Ajusta la altura de la barra
            paddingTop: 6,
            //paddingBottom: 20,  // Espaciado adicional en la parte inferior
          },
        };
      }}
    >
        <Tab.Screen name={screen.professional.tab} component={ProfessionalStack} options={{title:"Profesionales"}}/>
        <Tab.Screen name={screen.search.tab} component={SearchStack} options={{title: "Buscar"}}/>
        <Tab.Screen name={screen.account.tab} component={AccountStack} options={{title: "Cuenta"}}/>
        <Tab.Screen name={screen.ranking.tab} component={RankingStack} options={{title: "Ranking"}}/>



         {/* <Tab.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="Login"  component={LoginScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="Professionals" component={ProfessionalsScreen} options={{headerShown:false}}/> */}
         {/* <Tab.Screen name="ProfessionalDetail" component={ProfessionalDetailsScreen} options={{headerShown:false}}/> */}
    
    
    </Tab.Navigator>
)
};

function screenOptions(route, color, size) {
    
  
    let iconName;
    const iconSize = 30;
  
    if (route.name === screen.professional.tab) {
      //iconName = "briefcase-outline";
      iconName = "people-outline";
    } else if (route.name === screen.search.tab) {
      iconName = "search-outline";
    } else if (route.name === screen.ranking.tab) {
        iconName = "star-outline";
    } else if (route.name === screen.account.tab) {
      iconName = "person-outline";
    } else {
      iconName = "question-mark-outline"; // Fallback icon
    }
  
    
  
    return (
      <Icon
        name={iconName}
        style={{ width: iconSize, height: iconSize, tintColor: color }}
      />
    );
  }