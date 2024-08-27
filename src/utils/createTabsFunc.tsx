import axios from 'axios';
import FormData from 'form-data';
import { axiosPostInterceptor } from './axiosInterceptor';

interface TabImage {
  uri: string;
  type: string; 
  name: string; 
}

interface TabVideo {
  uri: string;
  type: string; 
  name: string;
}
export const createNewTab = async (
  textContent: string,
  tagIds: string[] = [],
  images: TabImage[] = [],
  videos: TabVideo[] = []
) => {
  // Prepare the payload as JSON
  const payload = {
    text_content: textContent,
    tag: tagIds,
    images: images.map(img => ({ image: img.uri })),
    videos: videos.map(vid => ({ video: vid.uri })),
  };

  console.log('Sending payload:', payload);

  try {
    const response = await axiosPostInterceptor('/home/tabs/', payload);
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
