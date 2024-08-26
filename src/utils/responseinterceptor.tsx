import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const DEBUG = true
const apiURL = DEBUG ? process.env.DEBUG_API_HOST : process.env.DEPLOYED_API_HOST

//Create an axios interceptor that can be used all over the app

const jwtRefreshInterceptor = axios.create({
    baseURL:`${apiURL}`
})
jwtRefreshInterceptor.interceptors.response.use((response) =>{
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
        return axios(error.config)
    }
        return Promise.reject(error)
}    
)

export default jwtRefreshInterceptor