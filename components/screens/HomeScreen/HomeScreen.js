import React from 'react';
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
  StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import {atom,useAtom} from 'jotai';
import { timeAtom, tempAtom, feelsAtom, weatherAtom, windAtom, humidAtom } from '../Home/Home1';


export default function HomeScreen () {
    const [city, setCity] = React.useState("Dar es salaam");
    const [appid, setAppid] = React.useState("6f9132f2bcd059d450eb84755d26ceb7");
    const [centi, setCenti] = React.useState(temp);
    const [time] = useAtom(timeAtom);
    const [temp] = useAtom(tempAtom);
    const [feels] = useAtom(feelsAtom);
    const [weather] = useAtom(weatherAtom);
    const [wind] = useAtom(windAtom);
    const [humid] = useAtom(humidAtom);
    /*const [temp, setTemp] = React.useState("");
    const [feels, setFeels] = React.useState("");
    const [weather, setWeather] = React.useState("");
    const [windspeed, setWindspeed] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [time, setTime] = React.useState("");*/
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
            
            return resp.json();
          })
          .then((responseJson) => {
            console.log('Printing out json');
            console.log(responseJson);
            const temp = responseJson.main.temp;
            console.log('Temperature',temp);
            const feels = responseJson.main.feels_like;
            console.log('feels like',feels);
            const weather = responseJson.weather[0].description;
            console.log('Weather is',weather);
            const windspeed = responseJson.wind.speed;
            console.log('windspeed is',windspeed);
            const humidity = responseJson.main.humidity;
            console.log('Humidity is', humidity);
          })
          .catch((error) => {
            console.log(error);
            //setState({spinner: false});
            Alert.alert('Error', error.message);
            throw error;
          });
    
        
      }
      function toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
      }
    return(
        <SafeAreaView style={styles.container}>
        <View >
        <Text style={styles.header}>Hewa</Text>
        <Text style={styles.city}> {city}</Text>
        <View style={styles.group2}>
        <Text style={styles.temp}> {temp} °C</Text>
        <Text>Feels like {feels} °C</Text>
        <Text>{weather}</Text>
        </View>
        
        <Text>Wind speed is {wind} Km/h</Text>
        <Text>The time is {time}</Text>
        <Text>The humidity is {humid}%</Text>
        

        </View>
        
    </SafeAreaView>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#224496",
        alignItems: "center",
        justifyContent: "center",
      },
      forgot_button: {
        
        color:'black'
      },
      header: {
        fontSize: 36,
        
        color:'white',
        top:'-90%',
        alignSelf: 'center',
      },
      city: {
        top: '-80%',
        alignSelf: 'center',
        fontSize: 25,
        fontFamily: "Cabin",
        fontWeight: "bold"
      },
      temp: {
        top: '-35%',
        fontSize: 45,
      },
      group2: {
        flexDirection: "column",
        alignItems: 'center',
        top: '-15%'
      }
})