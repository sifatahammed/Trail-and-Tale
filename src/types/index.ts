export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  date: string;
  thumbnail: string;
  tags: string[];
  categories: string[];
  featured?: boolean;
  comments?: Comment[];
  likes?: number;
  bookmarked?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SearchParams {
  query: string;
  tags: string[];
  categories: string[];
  page: number;
  limit: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes?: number;
}
