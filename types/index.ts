export type ListingCategory = 'apartment' | 'room' | 'parking' | 'other';
export type ListingStatus = 'active' | 'expired' | 'draft' | 'archived';
export type FurnishingStatus = 'furnished' | 'partially_furnished' | 'unfurnished';
export type UserRole = 'verified_student' | 'known_person' | 'known_company' | 'admin';
export type Language = 'it' | 'en';

export interface Listing {
  id: string;
  category: ListingCategory;
  title: string;
  description: string;
  images: string[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  price: number;
  expensesIncluded: boolean;
  monthlyExpenses?: number;
  annualAdjustment?: boolean;
  surface: number;
  rooms?: number;
  floor?: number;
  bathrooms: number;
  furnishing: FurnishingStatus;
  features: {
    terrace: boolean;
    garden: boolean;
    petsAllowed: boolean;
    accessible: boolean;
  };
  availableFrom: string;
  minimumContract?: number;
  rules?: string;
  status: ListingStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  address?: string;
  role: UserRole;
  username: string;
  createdAt: string;
}

export interface SearchFilters {
  category?: ListingCategory;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  minSurface?: number;
  maxSurface?: number;
  rooms?: number;
  bathrooms?: number;
  furnishing?: FurnishingStatus;
  terrace?: boolean;
  garden?: boolean;
  petsAllowed?: boolean;
  accessible?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  content: string;
  createdAt: string;
  read: boolean;
}
