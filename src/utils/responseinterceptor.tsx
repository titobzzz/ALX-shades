import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import  { apiURL } from "./authContext"


//Create an axios interceptor that can be used all over the app

const jwtRefreshInterceptor = axios.create({
    baseURL:`${apiURL}`
})
jwtRefreshInterceptor.interceptors.response.use((response) =>{
    console.log('Response data:', response.data);
    return response
}, async(error)=>{
    if(error.response.status === 401){
        await axios
        .get(`/accounts/auth/refresh/`,
        {
            withCredentials:true
        })
        .catch((refreshTokenError)=>{
            AsyncStorage.removeItem("userProfile")
            return Promise.reject(refreshTokenError)
        })
        return axios(error)
    }
        return Promise.reject(error)
}    
)

export default jwtRefreshInterceptor