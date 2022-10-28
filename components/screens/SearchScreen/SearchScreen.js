import React, {useContext} from 'react';
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
import { TextInput, Button } from 'react-native-paper';
import {atom,useAtom} from 'jotai';
import {useNavigation} from '@react-navigation/native';

export const time1Atom = atom('');
export const temp1Atom = atom('');
export const feels1Atom = atom('');
export const weather1Atom = atom('');
export const wind1Atom = atom('');
export const humid1Atom = atom('');
export const cityAtom = atom('');


export default function HomeScreen () {
    const navigation = useNavigation();
    const [text, setText] = React.useState("");
    const [appid, setAppid] = React.useState("73fc03faec98cb46c1b8d16fc1ba85b4");
    const [,setTimeAtom] = useAtom(time1Atom);
    const [,setTempAtom] = useAtom(temp1Atom);
    const [,setFeelsAtom] = useAtom(feels1Atom);
    const [,setWeatherAtom] = useAtom(weather1Atom);
    const [,setWindAtom] = useAtom(wind1Atom);
    const [,setHumidAtom] = useAtom(humid1Atom);
    const [,setCityAtom] =useAtom(cityAtom);
    function toCelsius(kelvin) {
        return kelvin - 273;
      }
    const onDisplayWeather = (e) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${appid}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
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
            navigation.navigate('Results');
            const city = responseJson.name;
            console.log('the city is',city);
            setCityAtom(city);
          })
          .catch((error) => {
            console.log(error);
            //setState({spinner: false});
            Alert.alert('Error', error.message);
            throw error;
          });}
    return(
        <SafeAreaView style={styles.container}>
        <View >
        <Text style={styles.header}>Hewa</Text>
        <TextInput
      label="Enter city name to search"
      value={text}
      onChangeText={text => setText(text)}
    />
    <Button  buttonColor ='#FFA500' mode="contained" onPress={onDisplayWeather}>
    Search
  </Button>
        </View>
        
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#224496",
        //alignItems: "center",
        //justifyContent: "center",
      },
      forgot_button: {
        
        color:'black'
      },
      header: {
        fontSize: 36,
        padding: 24,
        margin: 12,
        textAlign: "center",
        color:'white',
        top:'0%'
      },
})