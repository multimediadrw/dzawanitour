export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  duration_en?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  highlights_en?: string[];
  includes: string[];
  includes_en?: string[];
  description: string;
  description_en?: string;
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
  comment_en?: string;
  avatar: string;
  tourPackage: string;
  date: string;
  date_en?: string;
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
  question_en?: string;
  answer: string;
  answer_en?: string;
  category: string;
  category_en?: string;
}
