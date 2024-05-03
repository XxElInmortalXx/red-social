export type Client_Post = {
  content: string;
  images: { file: File }[];
};

export type Server_Post = {
  id: string;
  author: {
    name: string | undefined;
    email: string | undefined;
    image: string | undefined;
  };
  content: string;
  images: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
};

