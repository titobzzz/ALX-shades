import jwtRefreshInterceptor from "./responseinterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const axiosPostInterceptor =  async( URL:any, postData:any) => {
    // This will handle all post requests 
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await jwtRefreshInterceptor.post(URL, postData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in POST request:', error);
    throw error; 
  }
}

export const axiosPutInterceptor =  async( URL:any, postData:any) => {
    // This will handle all put requrst  
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await jwtRefreshInterceptor.put(URL, postData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in PUT request:', error);
    throw error; 
  }
}

export const axiosPatchInterceptor =  async( URL:any, postData:any) => {
    // This will handle all patch request
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await jwtRefreshInterceptor.patch(URL, postData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in PATCH request:', error);
    throw error; 
  }
}

export const axiosGetInterceptor =  async( URL:any, postData:any) => {
    // This will handle all get request
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await jwtRefreshInterceptor.get(URL,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in GET request:', error);
    throw error; 
  }
}

export const axiosDeleteInterceptor =  async( URL:any, postData:any) => {
    // This will handle all delete request
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await jwtRefreshInterceptor.delete(URL,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in GET request:', error);
    throw error; 
  }
}