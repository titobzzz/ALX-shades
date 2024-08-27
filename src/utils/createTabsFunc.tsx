import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosPostInterceptor } from './axiosInterceptor';

interface TabMedia {
  uri: string;
  media_type: string; 
  name: string; 
}

export const createNewTab = async (
  textContent: string,
  tagIds: string[] = [],
  media: TabMedia[] = []
) => {
  const formData = new FormData();
  formData.append('text_content', textContent);
  formData.append('tags', JSON.stringify(tagIds));

  const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  try {
    for (const [index, item] of media.entries()) {
      const blob = await uriToBlob(item.uri); 
      formData.append(`media_${index}`, blob, item.name); 
    }

    const response = await axiosPostInterceptor('/home/tabs/', formData);

    if (!response || !response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (err: any) {
    console.error('Error creating new tab:', err);
    if (err.response) {
      console.log("Server responded with:", err.response.status, err.response.data);
    }
    throw new Error(err.message || 'An error occurred');
  }
};
