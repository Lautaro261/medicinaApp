import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
import { AddProfessionalScreen } from "../screens/professionals/addProfessional/AddProfessionalScreen";
import { AddReviewProfessionalScreen } from "../screens/professionals/addReviewProfessional/AddReviewProfessional";
const Stack = createNativeStackNavigator();

export const ProfessionalStack = () => {
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
        name={screen.professional.professionals}
        component={ProfessionalsScreen}
        options={{title: "Profesionales"}}
        /> 

        <Stack.Screen
        name={screen.professional.addProfessional}
        component={AddProfessionalScreen}
        options={{title: "Nuevo Profesional"}}
        />

        <Stack.Screen
        name={screen.professional.professional}
        component={ProfessionalDetailsScreen}
        options={{title: "Profesional"}}
        />
        
        <Stack.Screen
        name={screen.professional.addReviewProfessional}
        component={AddReviewProfessionalScreen}
        options={{title: "Nueva opnión"}}
        />

    
    </Stack.Navigator>
  );
};

