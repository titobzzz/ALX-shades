import { View, Text,TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import { Dimensions } from 'react-native';
import { useState } from "react";

import * as ImagePicker from 'expo-image-picker'


const screenHeight = Dimensions.get('window').height;

export function CreatePostPage({navigation}:any){

    const [imageArray, setImageArray] = useState<any| undefined>([]) 
    const [mode, setMode] = useState<string>('')

    const uploadImage = async (mode:string) => {
        let result:any
            try{

                if(mode === 'gallery'){
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing:true,
                        aspect:[1, 1],
                    })
                }else if(mode === 'camera'){
                    await ImagePicker.requestCameraPermissionsAsync()
                 result = await ImagePicker.launchCameraAsync({
                    cameraType:ImagePicker.CameraType.back,
                    allowsEditing:true,
                    aspect:[1, 1],
                    quality:1
                })
                }
                
                if(!result.canceled) {
               setImageArray((prevImageArray:any) => [
                    ...prevImageArray,
                    result.assets[0]
                  ]);
                }
                await saveImage(imageArray) 
                }catch(error:any){
                    alert("Error uploading image: " + error.message)
                }}   
            const saveImage = async (image:any) => {
                try{
                    if(imageArray.length === 0 || imageArray.length < 4){
                         setImageArray(image)
                    }else if(imageArray.length >= 4){
                        throw Error("only four media are allowed")
                    }                       
            }catch(error:any){
                alert("Error uploading image: " + error.message)
            }}

  return(
    <View style={{     
        flex:1,
        backgroundColor:'black',
        paddingTop:10 ,   
  }}>
    <View style={styles.inputContainer}>
        <View >
                <TextInput
                    //   style={input.input}
                    placeholder="What's happening?"
                    multiline={true}
                    numberOfLines={4}
                />
                    <View> 
              {imageArray.map((image:any) =>
                {
                    console.log(`${image}`)
                    console.log(`${image.assetId}`)
                    return (
                        <ImageBackground
                        key={image.filename}
                        style={{
                            width: screenHeight*0.2, 
                            borderWidth:0.12,
                            borderColor:'black',
                            height:screenHeight*0.12, 
                            marginHorizontal:10}}
                        source={image}
                        />
                    )
                })
            }
                    </View>

        </View>
 

             <View style={styles.createOptionsContainer}>
                        <TouchableOpacity 
                        onPress={()=>uploadImage("gallery")}
                        >
                                <Image   style={{width: 27, height: 27}}  source={require('../../assets/images/image.png')} />
                    </TouchableOpacity>
                        
                    <TouchableOpacity 
                    onPress={()=>uploadImage("camera")} >
                                <Image   style={{width: 27, height: 27}}  source={require('../../assets/images/camera.png')} />
                    </TouchableOpacity>
                        
                    <TouchableOpacity  >
                                <Image   style={{width: 27, height: 27}}  source={require('../../assets/images/video.png')} />
                    </TouchableOpacity>
        
             </View>
            
    </View>

    
    <TouchableOpacity style={styles.publish} >
                 <Image   style={{width: 40, height: 40}}  source={require('../../assets/images/publish.png')} />
    </TouchableOpacity>
            
</View>
 ) }


const styles = StyleSheet.create({
    inputContainer:{
        backgroundColor:'yellow',
        height: screenHeight * 0.64,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
    },
    publish:{
        position: 'absolute',
        backgroundColor: 'aqua',
        borderRadius: 100,
        borderColor:'blackColor',
        borderWidth:1.5,        
        width: 60,
        height: 60,
        right: 20,
        bottom: 230,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createOptionsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10,
        position: 'absolute',
        bottom: 20,
        left: 10,
        gap:20,
        padding: 10,
        backgroundColor: 'aqua',
        borderRadius:15,
        borderColor:'blackColor',
        borderWidth:1.5,  
    }
})
