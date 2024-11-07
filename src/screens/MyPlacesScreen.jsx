import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, {Marker} from 'react-native-maps';
//import { geocoding_api_key } from '../firebase/database';

import * as Location from 'expo-location';


const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState("")
    const [places, setPlaces] = useState([{ "id": 1, "title": "Geek Out! Argentina", "coords": {"latitude":-34.555579051686586,"longitude":-58.461540799929494},"address":"Blanco Encalada 2518, C1425 Cdad. Autónoma de Buenos Aires" },{ "id": 2, "title": "Fuera de tiempo", "coords": {"latitude":-34.54776236446238,"longitude":-58.5538693790271},"address":"Blanco Encalada 2518, C1425 Cdad. Autónoma de Buenos Aires" }])
    const [address, setAddress] = useState("")


    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000, // Duración en milisegundos
        });
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return false;
        }
        return true
    }

    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={"Lugar Geek"} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </FlatCard>
    )



    const getLocation = async () => {
        const permissionOk = await getPermissions()
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`
                );
                const data = await response.json()
                //console.log(data)
                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress)
                } else {
                    console.log('Error en geocodificación inversa:', data.error_message)
                }
                showToast("success", "¡Ubicación obtenida!")
            } else {
                setErrorMsg('Error getting location');
                showToast("error", "No se pudo obtener la ubicación")
            }
            //console.log(location.coords)
            setLocation(location.coords);
        }
    }

    const savePlace = () => {
        if(location && title){
            setPlaces(prevState => [...prevState, { "id": Math.random(), title, "coords": { "latitude": location.latitude, "longitude": location.longitude },"address": address }])
            setTitle("")
            setLocation("")
        }else{
            showToast("error", "No se completaron todos los datos")
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis lugares:</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} value={title} />
                <Pressable onPress={getLocation}><Icon name="location-on" color={colors.naranjaBrillante} size={24} /></Pressable>
                <Pressable onPress={savePlace}><Icon name="add-circle" color={colors.verdeOk} size={32} /></Pressable>
            </View>
            <Text style={styles.subtitle}>Tus lugares favoritos:</Text>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}
            />
            <Toast />
        </View>
    );
}

export default MyPlacesScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      fontSize: 12,
      color: colors.grisOscuro
    },
    inputContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.grisMedio,
      borderRadius: 20,
      padding: 8,
      width: '80%',
      paddingLeft: 16,
    },
    placesContainer: {
      marginTop: 16
    },
    placeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 16,
      margin: 4,
      gap: 24
    },
    mapContainer: {
      width: 120,
      height: 120,
      borderRadius: 75,
      overflow: "hidden",
      elevation: 5,
    },
    map: {
      width: 120,
      height: 120,
    },
    mapTitle: {
      fontWeight: '700'
    },
    address: {
  
    },
    placeDescriptionContainer: {
      width: '60%',
      padding: 8
    }
  });