// import React from 'react';
// import { Text, View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen() {
//     return (
//         <View>
//             <Text> Home Screen </Text>
//         </View>
//     );
// }

// const StackContainer =()=>{
//     return(
//         <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//     )
// }

// const Stack = createStackNavigator();
// export default function App() {
//     return (
//         <NavigationContainer>
//             <HomeScreen/>
//              <StackContainer/>
//         </NavigationContainer>
//     );
// }
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

// Define types for movie data
export interface Movie {
  '#IMDB_ID': string;
  '#TITLE': string;
  '#AKA': string;
  '#IMG_POSTER': string;
  '#ACTORS': string[];
  '#RANK': string[];
}

// Define navigation stack
const Stack = createStackNavigator();

// Define InnerApp component
const InnerApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName={'MovieList'}>
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{title: 'Movies List'}}
        />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InnerApp;
