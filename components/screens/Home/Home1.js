import React, {useContext,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  StyleSheet,

} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import NavScreen from '../NavScreen';
import {atom,useAtom} from 'jotai';

export const timeAtom = atom('');
export const tempAtom = atom('');
export const feelsAtom = atom('');
export const weatherAtom = atom('');
export const windAtom = atom('');
export const humidAtom = atom('');


const Tab = createBottomTabNavigator();

export default function Home1() {
  const [city, setCity] = React.useState("Dar es salaam");
    const [appid, setAppid] = React.useState("73fc03faec98cb46c1b8d16fc1ba85b4");
    const [,setTimeAtom] = useAtom(timeAtom);
    const [,setTempAtom] = useAtom(tempAtom);
    const [,setFeelsAtom] = useAtom(feelsAtom);
    const [,setWeatherAtom] = useAtom(weatherAtom);
    const [,setWindAtom] = useAtom(windAtom);
    const [,setHumidAtom] = useAtom(humidAtom);
    function toCelsius(kelvin) {
      return kelvin - 273;
    }
    const onDisplayWeather = (e) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: city,
            appid: appid,
            
    
          })
        })
          .then(resp => {
            console.log('Printing out json');
            console.log(resp);
            const time = resp.headers.map.date;
            console.log('Time is',time);
            setTimeAtom(time);
            
            return resp.json();
          })
          .then((responseJson) => {
            console.log('Printing out json');
            console.log(responseJson);
            const temp = toCelsius(responseJson.main.temp);
            const temp1 = Math.round(temp);
            console.log('Temperature',temp1);
            setTempAtom(temp1);
            const feels = toCelsius(responseJson.main.feels_like);
            const feels1 = Math.round(feels);
            console.log('feels like',feels1);
            setFeelsAtom(feels1);
            const weather = responseJson.weather[0].description;
            console.log('Weather is',weather);
            setWeatherAtom(weather);
            const windspeed = responseJson.wind.speed;
            console.log('windspeed is',windspeed);
            setWindAtom(windspeed);
            const humidity = responseJson.main.humidity;
            console.log('Humidity is', humidity);
            setHumidAtom(humidity);
            
          })
          .catch((error) => {
            console.log(error);
            //setState({spinner: false});
            Alert.alert('Error', error.message);
            throw error;
          });}
    
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon : ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            useEffect(() => {
              onDisplayWeather();
            },[])
            
            iconName = focused ? 'home-filled' : 'home-filled';
          } 
          
          else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          }
          else if (route.name === 'Navigation') {
            iconName = focused ? 'arrow-back' : 'arrow-back';
          }
          
           // You can return any component that you like here!
           return <MaterialIcons name={iconName} size={size} color={color} />;
          },
       
          tabBarActiveTintColor: '#FFA500',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: '#224496',
          },
        })}
        
      >


        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
        <Tab.Screen name="Navigation" component={NavScreen} options={{headerShown:false}}/>
      </Tab.Navigator>
      
    

    );
  }
