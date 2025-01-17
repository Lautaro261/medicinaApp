import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from '../utils/ScreenName';
import { AppointmentFormScreen } from "../screens/appointments/appointmentForm/AppointmentFormScreen";
import { AvailableAppointmentsScreen } from "../screens/appointments/availableAppointments/AvailableAppointmentsScreen";
import { MyAppointmentsScreen } from "../screens/appointments/myAppointments/MyAppointmentsScreen";

const Stack = createNativeStackNavigator();

export const AppointmentStack = () => {
  return (
        <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D0B3F1', // Color de fondo global para todos los headers
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Color del texto del título global
          }
        }}>
    
          <Stack.Screen name={screen.appointment.availableAppointments} component={AvailableAppointmentsScreen} options={{ title: "Disponibilidad" }}/>
    
          <Stack.Screen name={screen.appointment.appointmentForm} component={AppointmentFormScreen} options={{ title: "Formulario" }}/>

          <Stack.Screen name={screen.appointment.myAppointments} component={MyAppointmentsScreen} options={{ title: "Mis turnos" }}/>
    
    
        </Stack.Navigator>
  );
};

