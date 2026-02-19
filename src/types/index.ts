export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "domestik" | "internasional" | "umrah";
  rating: number;
  reviewCount: number;
  highlights: string[];
  includes: string[];
  description: string;
  badge?: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  tourPackage: string;
  date: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  packageCount: number;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}
