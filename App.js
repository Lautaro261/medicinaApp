import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigation';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';

export default function App() {
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
