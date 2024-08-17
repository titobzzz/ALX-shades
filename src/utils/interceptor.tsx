import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const jwtRefreshInterceptor = axios.create({})

jwtRefreshInterceptor.interceptors.response.use((response) =>{
    return response
}, async(error)=>{
    if(error.response.status === 401){
        await axios
        .get("https://ballot-api.onrender.com/accounts/auth/refresh/",
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