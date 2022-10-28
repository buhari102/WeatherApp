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

export default function HomeScreen () {
    return(
        <SafeAreaView style={styles.container}>
        <View >
        <Text style={styles.forgot_button}>Nav screen</Text>
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
})