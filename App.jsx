import './gesture-handler';
import 'react-native-get-random-values';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigation } from './src/navigation/AppNavigation';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';

LogBox.ignoreAllLogs();

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  // Configuración de deep linking
  const linking = {
    prefixes: ['exp://192.168.100.2:8081', 'appcognikids://'], // Añadimos exp:// para pruebas de desarrollo
    config: {
      screens: {
        ProfessionalStack: 'professional', // Puedes agregar las pantallas según sea necesario
        AppointmentStack: 'appointments',
        AccountStack: 'account',
        // Agregar más pantallas de tu app aquí
      },
    },
  };

  useEffect(() => {
    // Verificar el deep link cuando la app se inicia
    const handleDeepLink = (event) => {
      console.log('Deep link event:', event);  // Aquí puedes ver el deep link
    };

    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    // Verifica el deep link inicial si la app está siendo abierta desde un deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('App opened with URL:', url);
        handleDeepLink({ url });
      }
    });

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer linking={linking}>
          <AppNavigation />
          <StatusBar style="auto" />
        </NavigationContainer>
        <Toast />
      </ApplicationProvider>
    </>
  );
};

//TODO: agregar iconos a los botones.
