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
  
  export interface TabMedia {
    id: string;
    tab: string;
    media_type: 'image' | 'video';
    file: string;
    duration?: number;
  }
  
  export interface Tabs {
    id: string;
    tag: string[];
    creator: User;
    text_content?: string;
    created: string;
    updated: string;
    media: TabMedia[];
  }
  