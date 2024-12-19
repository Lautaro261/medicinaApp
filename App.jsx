import './gesture-handler';
import 'react-native-get-random-values'
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigation } from './src/navigation/AppNavigation';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';
import {initFirebase} from "./src/utils/firebase";

LogBox.ignoreAllLogs();

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    // Todo Agregar theme={theme} de useColorScheme()

    <>
    <IconRegistry icons={EvaIconsPack}/>

    <ApplicationProvider {...eva} theme={theme}>

    <NavigationContainer>
      <AppNavigation/>
      <StatusBar style="auto"/>
    </NavigationContainer>
    </ApplicationProvider>
    </>
   
  );
}
