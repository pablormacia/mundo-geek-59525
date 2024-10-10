import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductScreen from './src/screens/ProductScreen';
import Header from './src/components/Header';
import {useEffect,useState} from 'react'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Static.ttf')
  });

  const [category, setCategory] = useState("")
  const [productId, setProductId] = useState(null)
  //console.log(category)

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Header />
      {
        productId
        ?
        <ProductScreen productId={productId} setProductId={setProductId}/>
        :
        category
        ?
        <ProductsScreen category={category} setCategory={setCategory} setProductId={setProductId}/>
        :
        <CategoriesScreen setCategory={setCategory}  />
      }
      <StatusBar style="light" />
    </>
  );
}

