import React from "react";
import { View, Text,TextInput, Image, TouchableOpacity,ActivityIndicator,SafeAreaView, Alert } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import { useContext, useState } from "react"
import show from "../../assets/images/show.png"
import shownot from "../../assets/images/Notshow.png"
import AuthContext from "../utils/authContext"
import  Loader from "../component/loader"

interface LoginPayloadtype {
  email:string,
  password:string
}

export function LoginPage({navigation}:any){
  const [passowrdIcon, setPassowrdIcon] =useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)
  const [valid, setValid] = useState<any>(null)

  const{loginApiConnect} = useContext(AuthContext)
  
  const [details, setdetails] =useState<LoginPayloadtype>({
    email:"",
    password:""
  })

  const handleOnChange =(text:any, input : string)=>{
    setdetails((prevstate:any)=>({...prevstate, [input]:text}))
  }

  const login = async (details:LoginPayloadtype )=>{
    setLoading(true)
    if(details.email === "" || details.password === "" ){
      setLoading(false)
      Alert.alert("Error","fields can't be empty");
      return setValid(false)
    }else{
      if(valid === true){
          try {
              await loginApiConnect(details);
              navigation.navigate('Home');
          } catch (error: any | undefined) {
              setLoading(false)
              if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessages = Object.values(responseData).flat();
                Alert.alert("Couldn't Login",errorMessages.join("\n"));
              }else if (error.message) {
                  Alert.alert("Couldn't Login",error.message);
              }
          }}}}

  return (
       <View style={{
          flex:1,
          display:"flex",
          backgroundColor:'black',
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          padding:30 ,   
    }}>
      <View>
        <Text style={{
          color:"white",
          fontFamily:"Poppins-Medium",
          fontSize:35,
          }} >
          <Text style={{
            fontSize:37,
            fontFamily:"Poppins-Bold",
          }}>
            Welcome back!
          </Text>
    <Text> Let’s sign 
      <Text style={fontStyles.green}> you</Text> into your account</Text>
    </Text>
    </View>
    <View style={{
      marginTop:50 ,
      marginBottom:30,
      borderTopWidth:0.5,
      borderTopColor:"grey" 
    }} >
        <View style={input.textinputContainer}>
          <TextInput 
          placeholder="Email" 
          placeholderTextColor={"grey"} 
          style={input.textinput}
          onChangeText={(text)=>
            handleOnChange(text,"email")
          }
          autoCorrect={false}/>          
        </View>
        <View style={input.textinputContainer}>
          <TextInput 
          placeholder="Password" 
          onFocus={()=> setPassowrdIcon(true)}
          placeholderTextColor={"grey"} 
          onBlur={()=>setPassowrdIcon(false)}
          onChangeText={(text)=>{
            handleOnChange(text,"password")
           
            }
          }    
          style={input.textinput} 
          secureTextEntry={showPassword ? false : true}/>
           { passowrdIcon ?
          showPassword ?
          <TouchableOpacity
          onPress={()=>{
            setShowPassword(prev=>!prev)
          }}>
             <Image 
          source={shownot} style={{
            width:20,
            height:20,
            margin:10,
            opacity:0.5
          }} />
          </TouchableOpacity>:
          <TouchableOpacity
          onPress={()=>{
            setShowPassword(prev=>!prev)
          }}>
             <Image 
          source={show} style={{
            width:20,
            height:20,
            margin:10,
            opacity:0.5
          }} />
          </TouchableOpacity>         
           : <Image source={lock} style={{
            width:20,
            height:20,
            margin:10,
            opacity:0.5
          }} />

          }
        </View>
      </View>
    
        <TouchableOpacity style={{
            backgroundColor:"white",
            width:280,
            margin:18,
            marginBottom:25,
            padding:15,
            borderRadius:15,
          }}
          onPress={() =>
            login(details)
          }>
            <Text style={{
              textAlign:"center",
              fontFamily:"Poppins-Bold",
              fontSize:17,
            }}>
                Sign in
            </Text>
          </TouchableOpacity>
               

<Text style={{
          color:"white",
          fontFamily:"Poppins-Medium",
          fontSize:16,
          textAlign: 'center',
          paddingTop:10
          }}>
  Don't have an account? <Text onPress={()=>navigation.navigate('Register')} style={fontStyles.green}> Register</Text>
  </Text>      
  <Loader  
  content={"loggingin"}
  visible={loading}/>
    </View>          
  )
}


