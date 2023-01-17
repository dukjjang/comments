export interface Comment {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface InputValues {
  [key: string]: string;
  author: string;
  profile_url: string;
  content: string;
  createdAt: string;
}
