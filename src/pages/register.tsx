import React from "react";
import { View, Alert, Text,TextInput, Image, Keyboard, TouchableOpacity } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import show from "../../assets/images/show.png"
import shownot from "../../assets/images/Notshow.png"
import { useState ,useContext,  useRef} from "react"
import axios from 'axios';
import AuthContext from "../utils/authContext"
import Loader from "../component/loader"


export function RegisterPage({navigation}:any){
  const [errors, setErrors] =useState<any>([])
  const [message, setMessage]= useState<any>([])
  const [passowrdIcon1, setPassowrdIcon1] =useState(false)
  const [passowrdIcon2, setPassowrdIcon2] =useState(false)
  const [showPassword1,setShowPassword1] = useState(false)
  const [showPassword2,setShowPassword2] = useState(false)
  const [valid, setValid] = useState(true)
  const [password2, setPassword2] = useState("")
  const[loading, setLoading] = useState(false)
  const [content,setContent] = useState("creating account")
  const{loginApiConnect} = useContext(AuthContext)

 
  const [details, setdetails] =useState<any>({
    email:"",
    username:"",
    password:""
  })

  
  //adds input data to the details state hooke ontyping anything 
  const handleOnChange =(text:any, input : string)=>{
    setdetails((prevstate:any)=>({...prevstate, [input]:text}))
  }

  // The fucnton that handles errors for the "error" state hooke
 const handleErrors= async (errormessage:any)=>{
      setErrors((prevErrors:any) => [ ...prevErrors,errormessage])
    }

  //The register function that create a user int the API
    const register= async(payload:any)=>{
      setLoading(true)

      try {
                const response = await axios.post("https://ballot-api.onrender.com/accounts/", payload);
        // Check for a successful response
        if (response.status === 200 || response.status === 201) {
          setMessage("Your account has been created successfully");
          setLoading(false)
          Alert.alert("Account Creation Successful", "Your account has been created successfully", [
            { text: "Login", onPress: () => {
              setContent("Logging in")
              setLoading(true)
              let dets ={
                email:payload.email, 
                password:payload.password
              }
              loginApiConnect(dets)
              navigation.navigate('Home');
            }}
          ]);

        } else {
          setLoading(false)
          console.error("Unexpected response status:", response.status);
        }
      } catch (error:any) {
        setLoading(false)
        let errorMessage = "An error occurred during registration";

        if (error.response && error.response.data) {
          const responseData = error.response.data;
          const errorMessages = Object.values(responseData).flat();
          errorMessage = errorMessages.join("\n");
        } else if (error.message) {
          errorMessage = error.message;
        }
      
        Alert.alert("Registration failed", errorMessage, [{ text: "Try again", onPress: () => {
          navigation.navigate("Register");
        }}]);
      }
    }
     

  //validate if the form data is correct
  const validate = ()=>{
    Keyboard.dismiss()
    for (let key in details) {
      if (details[key] === "") {
        setValid(false);
        handleErrors("Please fill all fields");
        break; // Exit loop if any field is empty
      }
    }
    if(!details.email){
      handleErrors("Email field cannot be empty")
      setValid(false)
        }
    if(!details.username){
      handleErrors("username field cannot be empty")
      setValid(false)
    }
   
    if(details.password !== password2){
        handleErrors("password confirmation error")
        setValid(false)
      }
  if (details.password.length < 7 || details.password.length > 12  ){
      handleErrors("password length cannot be less than 5 or longer than 10")
      setValid(false)
    }
 if (errors.length === 0) {
    setValid(true) 
      register(details);
  } else {
    setValid(false)
      Alert.alert("Validation Error", errors.join("\n"), [{ text: "Try again",onPress:()=>{
        navigation.navigate("Register")
      } }]);
      setErrors([])
  }
  }
  



  return (
    <View style={{
      flex:1,
      display:"flex",
      backgroundColor:"black",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      padding:30
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
            Welcome!
          </Text>
    <Text> Let’s set up your account with </Text> 
      <Text style={fontStyles.green}> ease</Text>
    </Text>
    </View>
    <View style={{
      marginTop:20 ,
      marginBottom:30,
      borderTopWidth:0.5,
      borderTopColor:"grey" 
    }} >
       <View style={input.textinputContainer}>
          <TextInput placeholder="Email"
           placeholderTextColor={"grey"} 
           onChangeText={(text)=>handleOnChange(text,"email")}   
           style={input.textinput}/>
        </View>
        <View style={input.textinputContainer}>
          <TextInput placeholder="Username" 
          placeholderTextColor={"grey"} 
          onChangeText={(text)=>handleOnChange(text,"username")}   
           style={input.textinput}/>
        </View>
        <View style={input.textinputContainer}>
          <TextInput placeholder="Password" 
          onBlur={()=>setPassowrdIcon1(false)}
          placeholderTextColor={"grey"} 
          style={input.textinput} 
          onFocus={()=>setPassowrdIcon1(true)}
          onChangeText={(text)=>
            {
              handleOnChange(text,"password")
            }
            }   
          secureTextEntry= {showPassword1 ? false : true}/>
          { passowrdIcon1 ?
          showPassword1 ?
          <TouchableOpacity
          onPress={()=>{
            setShowPassword1(prev=>!prev)
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
            setShowPassword1(prev=>!prev)
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
        <View style={input.textinputContainer}>
          <TextInput placeholder="ComfirmPassword" 
          onChangeText={(text) => setPassword2(text)}
          onBlur={()=>setPassowrdIcon2(false)}
          placeholderTextColor={"grey"} 
          style={input.textinput}
          onFocus={()=>setPassowrdIcon2(true)}          
          secureTextEntry={showPassword2 ? false : true}/>
           { passowrdIcon2 ?
          showPassword2 ?
          <TouchableOpacity
          onPress={()=>{
            setShowPassword2(prev=>!prev)
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
            setShowPassword2(prev=>!prev)
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
            padding:15,
            borderRadius:15,
          }}
          onPress={() =>
            validate()           
          }>
            <Text style={{
              textAlign:"center",
              fontFamily:"Poppins-Bold",
              fontSize:17,
              
            }}>
                Register
            </Text>
          </TouchableOpacity>

<Text style={{
          color:"white",
          fontFamily:"Poppins-Medium",
          fontSize:16,
          textAlign: 'center',
          paddingTop:10
          }}>
  Already have an account ? <Text onPress={()=>navigation.navigate('Login')} style={fontStyles.green}>sign in</Text>
  </Text>      
  <Loader 
  content={content}
  visible={loading}/>
    </View>
  )
}


