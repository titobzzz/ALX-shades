import { StyleSheet, Text, View , StatusBar} from 'react-native';
//3rd party
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//pages
import { LoginPage } from './src/pages/login';
import { RegisterPage } from './src/pages/register';
import {HomePage} from './src/pages/Home'
import {CreatePostPage} from './src/pages/createpost'
// import {VideoCameraScreen} from './src/pages/videoscreen'

//utils
import {AuthContextProvider}  from "./src/utils/authContext"


const Stack = createNativeStackNavigator();
 
export default function App() {

  let [fontsLoaded]= useFonts({
    "Poppins-Black":require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic":require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold":require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold":require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight":require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light":require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium":require("./assets/fonts/Poppins-Medium.ttf"),
  })
  if (!fontsLoaded) {
    return null;
  }
 
  return (   
   
    <AuthContextProvider> 
       <View style={{ flex: 1 }}> 
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>        
            <Stack.Screen  name="Home" options={{headerShown:false}} component={HomePage} />
            {/* <Stack.Screen name="Login" options={{headerShown:false}} component={LoginPage} />
        <Stack.Screen name="Register" options={{headerShown:false}} component={RegisterPage} /> */}
            <Stack.Screen  name="CreatePost" options={{headerShown:false}} component={CreatePostPage} />
            {/* <Stack.Screen name="VideoCamera" component={VideoCameraScreen} /> */}
      </Stack.Navigator>
  </NavigationContainer>
   </View>
  </AuthContextProvider>
  
    
   
    
  )
}  
