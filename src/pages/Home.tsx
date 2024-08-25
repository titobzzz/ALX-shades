import React from "react";
import { View, Text,TextInput, Image, StyleSheet, TouchableOpacity } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import Header from "../component/Header"
import Ballot from "../component/ballot"
import { useNavigation } from '@react-navigation/native';

export function HomePage(){

  const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('CreatePost');
    };
  
  return(
    <View style={{     
      flex:1,
      backgroundColor:'black',
      paddingTop:10 ,   
}}>
  <Header/>
            <View>
          <Ballot
        avatar={require('../../assets/images/git.jpg')}
        handle="@johndoe"
        username="Joshua"
        content="This is a sample tweet. React Native with TypeScript is awesome!"
        likes={42}
        retweets={7}
        comments={3}
      />
              </View>
              <TouchableOpacity style={styles.makepost} onPress={handlePress} >
                 <Image source={require('../../assets/images/newpost.png')}  style={styles.newpost}/>
              </TouchableOpacity>
             
            
</View>
 ) }

 const styles = StyleSheet.create({
  makepost:{
    position: 'absolute',
    backgroundColor: 'aqua',
    borderRadius: 100,
    width: 60,
    height: 60,
    right: 20,
    bottom: 20,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'

    },
    newpost:{
      width: 30,
      height: 30,
    }
        

 })