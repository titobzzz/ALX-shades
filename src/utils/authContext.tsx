import React, { ReactNode, useState, createContext , useEffect } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob"

interface AuthContextProviderProps {
    children: ReactNode; 
  }
  interface LoginPayloadtype {
    email:string,
    password:string
  }


const AuthContext = createContext<any | undefined>(undefined)

 export const AuthContextProvider:React.FC<AuthContextProviderProps> = ({children}) =>{
    
    const [user, setUser] = useState(null)
    const [tokens, settokens] = useState<any>(null)

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const userprofile = await AsyncStorage.getItem("userProfile");
            if (userprofile) {
              setUser(JSON.parse(userprofile));
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };
    
        fetchUserProfile();
      }, []);

    const loginApiConnect = async(payload:LoginPayloadtype) =>{
       const token = await axios.post("https://ballot-api.onrender.com/accounts/auth/login/" , payload,
        {
            withCredentials:true
        })
        const accesstoken = token.data.access
        settokens(token)
        const getUser = jwtDecode<any>(accesstoken)
        let  userid = getUser.user_id         
        const apiresponse =  await axios.get(`https://ballot-api.onrender.com/accounts/user/${userid}/`, {
            withCredentials:true
        })
        setUser(apiresponse.data)
        await AsyncStorage.setItem("userProfile",JSON.stringify(apiresponse.data))          
    }
    return(
        <AuthContext.Provider value={{loginApiConnect, user}}>
          {children}
        </AuthContext.Provider>

    )
}

export default AuthContext