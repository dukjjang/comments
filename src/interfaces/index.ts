export interface Comment {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface InputValues {
  [key: string]: string | number;
  id: number;
  author: string;
  profile_url: string;
  content: string;
  createdAt: string;
}

export interface SystemError {
  code: string;
  message: string;
}
