import jwtRefreshInterceptor from "./responseinterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const axiosPostInterceptor = async (URL: string, postData: any,  customConfig: any = {}) => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (!accessToken) {
            console.error('Access token is null or undefined');
            throw new Error('Access token is missing');
        }
        const token = accessToken.replace(/^"|"$/g, '');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            ...customConfig.headers
        };

        const config = {
            ...customConfig,
            headers
        };

        const response = await jwtRefreshInterceptor.post(URL, postData, config);
        return response;
    } catch (error: any) {
        console.error('Error in POST request:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error; 
    }
};

export const axiosPutInterceptor =  async( URL:any, postData:any) => {
    // This will handle all put requrst  
    try {
        const accessToken = await AsyncStorage.getItem('access_token') 
        if (accessToken === null) {
            console.error('Access token is null or undefined');
            return null;
          }
          const token = accessToken.replace(/^"|"$/g, '');
        const response = await jwtRefreshInterceptor.put(URL, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
   catch (error) {
    console.error('Error in PUT request:', error);
    throw error; 
  }
}

export const axiosPatchInterceptor =  async( URL:any, postData:any) => {
    // This will handle all patch request
    try {
        const accessToken = await AsyncStorage.getItem('access_token') 
        if (accessToken === null) {
            console.error('Access token is null or undefined');
            return null;
          }
          const token = accessToken.replace(/^"|"$/g, '');
        const response = await jwtRefreshInterceptor.patch(URL, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
   catch (error) {
    console.error('Error in PATCH request:', error);
    throw error; 
  }
}

export const axiosGetInterceptor =  async( URL:any) => {
    // This will handle all get request
    try {
        const accessToken = await AsyncStorage.getItem('access_token') 
        if (accessToken === null) {
            console.error('Access token is null or undefined');
            return null;
          }
          const token = accessToken.replace(/^"|"$/g, '');
        const response = await jwtRefreshInterceptor.get(URL,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
   catch (error) {
    console.error('Error in GET request:', error);
    throw error; 
  }
}

export const axiosDeleteInterceptor =  async( URL:any, postData:any) => {
    // This will handle all delete request
    try {
        const accessToken = await AsyncStorage.getItem('access_token') 
        if (accessToken === null) {
            console.error('Access token is null or undefined');
            return null;
          }
          const token = accessToken.replace(/^"|"$/g, '');
        const response = await jwtRefreshInterceptor.delete(URL,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
   catch (error) {
    console.error('Error in GET request:', error);
    throw error; 
  }
}