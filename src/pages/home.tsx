import React, { useEffect,useState } from "react";

import { View, Text,TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import Header from "../component/Header"
import Tab from "../component/Tab"
import { useNavigation } from '@react-navigation/native';

import { axiosGetInterceptor } from '../utils/axiosInterceptor';
import { Tabs } from "../interfaces/interfaces";


export function HomePage(){

  const navigation = useNavigation();

  const [tabs, settabs] = useState<Tabs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  console.log('tabs')

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);          
          const response = await axiosGetInterceptor('/home/tabs/');          
          settabs(response?.data);
        } catch (err:any) {
          // Handle error
          setError(err.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    const handlePressCreate = () => {
      navigation.navigate('CreateTab');
    };

  return(
    <View style={{     
      flex:1,
      backgroundColor:'black',
      paddingTop:10 ,   
}}>
  <Header/>
  <ScrollView>
      {tabs?.map((tab) => (
        <Tab
          key={tab.id} 
          data={tab}
          likes={42} 
          retweets={7} 
          comments={3} 
        />
      ))}
    </ScrollView>

              <TouchableOpacity style={styles.makepost} onPress={handlePressCreate} >
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