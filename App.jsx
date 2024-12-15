import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { AppNavigation } from './src/navigation/AppNavigation';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    // Todo Agregar theme={theme} de useColorScheme()

    <ApplicationProvider {...eva} theme={theme}>

    <NavigationContainer>
      <AppNavigation/>
      <StatusBar style="auto"/>
    </NavigationContainer>
    </ApplicationProvider>
  );
}
