/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  Button,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react"


type SectionProps = PropsWithChildren<{
  title: string;
}>;





const Stack = createNativeStackNavigator();


function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>

      <View
      >
        <Text style={{

          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'lightblue',


        }}>Try editing me! 🎉</Text>


      </View>


      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}



function HomeView({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title='Press' onPress={() => navigation.navigate('AboutView')}></Button>
    </View>
  );
}



function AboutView({ navigation }) {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>About Screen</Text>
      <Button title='Go Back' onPress={() => navigation.navigate('HomeView')}></Button>
    </View>
  )
}




const ListView = ({ navigation }) => {

  const [vid, setVid] = useState([])
  useEffect(() => {
    fetch("http://192.168.50.176:3000/videos")
      .then((response) => { return response.json(); })
      .then((Loose) => {
        setVid(Loose);
      })

      .catch(error => console.error(error))
  }, []);

  return (
    <View>


      <h1>Video List</h1>
      <p>View all types of video here.</p>

      <Text>Navigate to DetailView</Text>
      <FlatList
        data={vid}
        renderItem={({ item }) =>

          <TouchableOpacity onPress={() => navigation.navigate('DetailView', { id: item.id })}>


            <View


              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <Image source={{ uri: item.thumbnail }}
                width={100}
                height={100}
              />
              <View style={{ padding: 5 }}>
                <Text>{item.title}</Text>
                <Text>{item.url}</Text>


              </View>

            </View>

          </TouchableOpacity>


        }>


      </FlatList>

    </View>
  );
};


const DetailView = ({ navigation, route }) => {
  const videoID = route.params.id
  useEffect(() => {
    fetch("http://192.168.50.176:3000/videos")
     .then((response) => { return response.json(); })
     .then((Link)=>{
      console.log(Link)

     })
      

}, []);

return (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('ListView')}>
      <Text>{videoID}</Text>
    </TouchableOpacity>
  </View>
)
}


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListView'>
        <Stack.Screen name='HomeView' component={HomeView} />
        <Stack.Screen name='AboutView' component={AboutView} />

        <Stack.Screen name="ListView" component={ListView} />
        <Stack.Screen name="DetailView" component={DetailView} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
