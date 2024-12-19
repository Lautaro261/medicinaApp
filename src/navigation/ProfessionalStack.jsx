import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
import { AddProfessionalScreen } from "../screens/professionals/addProfessional/AddProfessionalScreen";
const Stack = createNativeStackNavigator();

export const ProfessionalStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
      name={screen.professional.addProfessional}
      component={AddProfessionalScreen}
      options={{title: "Nuevo Profesional"}}
      />
         <Stack.Screen
        name={screen.professional.professionals}
        component={ProfessionalsScreen}
        options={{title: "Profesionales"}}
        /> 


        <Stack.Screen
        name={screen.professional.professional}
        component={ProfessionalDetailsScreen}
        options={{title: "Profesional"}}
        />

    
    </Stack.Navigator>
  );
};

