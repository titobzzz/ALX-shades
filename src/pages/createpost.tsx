import React from "react"
import { View, Text,TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import { Dimensions } from 'react-native';
import { useState } from "react";
import * as FileSystem from 'expo-file-system'
import { fontStyles as font } from "../styles/fontstyle"


import * as ImagePicker   from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';



const screenHeight = Dimensions.get('window').height;

export function CreatePostPage({navigation}:any){

    const [imageArray, setImageArray] = useState<any| undefined>([]) 
    const [mode, setMode] = useState<string>('')
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const uploadImage = async (mode: string) => {
      let result: any;
      try {
          if (mode === 'gallery') {
              await ImagePicker.requestMediaLibraryPermissionsAsync();
              result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All, // This allows both images and videos
                  allowsMultipleSelection: true,
              });
          } else if (mode === 'camera') {
              await ImagePicker.requestCameraPermissionsAsync();
              result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images, // This allowsimages 
                  allowsEditing: true,
                  quality: 1,
              });
            }
              else if (mode === 'video') {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Videos, // This allowsvideos
                    allowsEditing: true,
                    quality: 1,
                });

          }
  
          if (!result.canceled && result.assets) {
              const newMedia = await Promise.all(
                  result.assets.map(async (element: any) => {
                      const uri = element.uri;
  
                      if (uri.startsWith('content://')) {
                          const fileInfo = await FileSystem.getInfoAsync(uri);
                          return { uri: fileInfo.uri }; 
                      } else {
                          return { uri }; 
                      }
                  })
              );
  
              if (imageArray.length + newMedia.length <= 4) {
                  setImageArray((prevImageArray: any) => [...prevImageArray, ...newMedia]);
              } else {
                  throw Error("Only four media are allowed");
              }
          }
      } catch (error: any) {
          alert("Error uploading media: " + error.message);
      }
      };

      const handleImagePress = async (index: number, imageUrl: string) => {
        try {
          const manipResult = await ImageManipulator.manipulateAsync(
            imageUrl,
            [], 
            { format: ImageManipulator.SaveFormat.PNG }
          );
      
          const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const editedImage = { uri: pickerResult.assets[0].uri };
            setImageArray((prevImages: any[]) =>
              prevImages.map((img, imgIndex) => (imgIndex === index ? editedImage : img))
            );
          }
        } catch (error) {
          console.log('Error editing image:', error);
        }
      };
      //to delete the pictures 
      const deleteImage = (index: number) => {
        const newImages = imageArray.filter((_:any, imgIndex:number) => imgIndex !== index);
        setImageArray(newImages);
      };

  return(
    <View style={{     
        flex:1,
        backgroundColor:'black',
        flexDirection: 'column',
        paddingTop:10 ,   
  }}>
    <View style={styles.inputContainer}>    
                <TextInput
                    style={styles.input}
                    placeholder="What's happening?"
                    multiline={true}
                    numberOfLines={4}
                />
                    <View 
                    style={{
                        display: 'flex',
                        gap: 4,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        marginBottom: 10,
                        marginLeft:"auto",
                        bottom:0,
                       flexWrap: 'wrap'
                    }}
                    > 
              {imageArray.map((image:any, index:number) =>
                {
                  
                    return (
                      <View key={index} style={{ position: 'relative'}}>
                        <TouchableOpacity 
                        onPress={() => handleImagePress(index, image.uri)}> 
                          <Image
                        key={index}
                        style={{
                            width: screenHeight*0.15, 
                            borderRadius:15,
                            borderWidth:0.12,
                            borderColor:'black',
                            height:screenHeight*0.13, 
                            marginHorizontal:10,
                            opacity:0.72
                          }}
                        source={{uri : image.uri}}
                        /></TouchableOpacity>
                       
                        
                        <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() => deleteImage(index)}
                      >
                        <Text style={styles.deleteText}>X</Text>
                      </TouchableOpacity>
                        </View>
                        
                    )
                })
            }
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
                        
                    <TouchableOpacity 
                     onPress={()=>uploadImage("video")} >
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
      position:"relative",
      display:"flex",
      flexDirection:"row",
        backgroundColor:'yellow',
        height: screenHeight * 0.69,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
    },
    input: {
        borderColor: 'gray',
        padding: 10,
        width: '65%',
        textAlignVertical: 'top', 
        borderRadius: 5,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
         ...font.bold,
         fontSize:16
      },
    publish:{
        position: 'absolute',
        backgroundColor: 'aqua',
        borderRadius: 100,
        borderColor:'blackColor',
        borderWidth:1.5,        
        width: 60,
        height: 60,
        right: 40,
        bottom: 190,
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
    },
      deleteIcon: {
        position: 'absolute',
        top: -4,
        right: -3,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      deleteText: {
        ...font.green,
        ...font.bold,
        color: 'white',
        fontSize: 19,
      }
})
