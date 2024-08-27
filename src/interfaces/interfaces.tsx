export interface HashTags {
    id: string;
    name: string; 
  }
  
  export interface User {
    id: string;
    last_login: string | null;
    username: string;
    full_name: string;
    handle: string;
    avatar: string;
    email: string;
    date_of_birth: string | null;
    bio: string | null;
  }
  
  
  export interface TabImage {
    id: number;
    image: string | null; 
  }
  
  export interface TabVideo {
    id: number;
    video: string | null;
  }
  

  export interface Tabs {
    id?: string;
    tag?: HashTags[];
    creator?: User;
    text_content?: string | null;
    created?: string;
    updated?: string;
    images?: TabImage[];
    videos?: TabVideo[];
  }
  