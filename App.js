import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'

//import TabNavigator from './src/navigation/TabNavigator';
import MainNavigator from './src/navigation/MainNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';

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

