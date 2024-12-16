import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { ProfessionalsScreen } from "../screens/professionals/professionals/ProfessionalsScreen";
import { ProfessionalDetailsScreen } from "../screens/professionals/professional/ProfessionalDetailScreen";
const Stack = createNativeStackNavigator();

export const ProfessionalStack = () => {
  return (
    <Stack.Navigator>

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

