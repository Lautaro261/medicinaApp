import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screen } from '../utils/ScreenName';
import { ProfessionalStack } from "./ProfessionalStack";
import { AccountStack } from "./AccountStack";
import { SearchStack } from "./SearchStack";
import { Icon } from "@ui-kitten/components";
import { RankingStack } from "./RankingStack";
import { AppointmentStack } from "./AppointmentStack";

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
        <Tab.Screen name={screen.appointment.tab} component={AppointmentStack} options={{title: "Mis Turnos"}}/>
        <Tab.Screen name={screen.ranking.tab} component={RankingStack} options={{title: "Ranking"}}/>
        <Tab.Screen name={screen.account.tab} component={AccountStack} options={{title: "Cuenta"}}/>

    
    
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
    } else if (route.name === screen.appointment.tab) {
      iconName = "calendar-outline";
    } else {
      iconName = "question-mark-outline"; 
    }
  
    
  
    return (
      <Icon
        name={iconName}
        style={{ width: iconSize, height: iconSize, tintColor: color }}
      />
    );
  }