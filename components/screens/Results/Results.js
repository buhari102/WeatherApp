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
import {atom,useAtom} from 'jotai';
import { time1Atom, temp1Atom, feels1Atom, weather1Atom, wind1Atom, humid1Atom, cityAtom } from '../SearchScreen/SearchScreen';
import {useNavigation} from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

export default function HomeScreen () {
    const [time] = useAtom(time1Atom);
    const [temp] = useAtom(temp1Atom);
    const [feels] = useAtom(feels1Atom);
    const [weather] = useAtom(weather1Atom);
    const [wind] = useAtom(wind1Atom);
    const [humid] = useAtom(humid1Atom);
    const [city] = useAtom(cityAtom);
    const navigation = useNavigation();

    const onBack = () => {
        navigation.navigate('Home');
        return
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
        <Text>Wind speed is {wind}</Text>
        <Text>The time is {time}</Text>
        <Text>The humidity is {humid}%</Text>
        <Button buttonColor ='#FFA500' mode="contained" onPress={onBack}>
    Back
  </Button>

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