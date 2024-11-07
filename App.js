import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'

//import TabNavigator from './src/navigation/TabNavigator';
import MainNavigator from './src/navigation/MainNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';

import { createSessionsTable } from './src/db';

//import { clearSessions } from './src/db';

createSessionsTable()
  .then((result)=>console.log("Tabla creada o inicializada con éxito: ", result))
  .catch((error)=>console.log("Error al crear la tabla Sessions: ", error))

  //clearSessions().then().catch()

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Static.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}

