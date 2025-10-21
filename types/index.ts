export interface Category {
  id: number;
  nameIt: string;
  nameEn: string;
  createdAt: string;
}

export interface FurnishingStatus {
  id: number;
  nameIt: string;
  nameEn: string;
  createdAt: string;
}

export interface ListingStatus {
  id: number;
  nameIt: string;
  nameEn: string;
  createdAt: string;
}

export interface ListingImage {
  id: number;
  idListing: number;
  videoUrl: string;
  isPrimary: boolean;
  orderIndex: number;
  createdAt: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  companyWebsite?: string;
  email: string;
  phoneNumber: string;
  address?: string;
  isIndividual: boolean;
  isAgency: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: number;
  idUser: number;
  user?: User;
  idCategory?: number;
  category?: Category;
  idFurnishingStatus?: number;
  furnishingStatus?: FurnishingStatus;
  idListingStatus?: number;
  listingStatus?: ListingStatus;
  title?: string;
  description?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  surfaceArea?: number;
  numberOfRooms?: number;
  floor?: number;
  numberOfBathrooms?: number;
  monthlyRent?: number;
  expensesIncluded?: boolean;
  monthlyExpenses?: number;
  annualAdjustment?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  petsAllowed?: boolean;
  availabilityDate?: string;
  isAvailableImmediately?: boolean;
  minContractDuration?: number;
  rules?: string;
  hasElevator?: boolean;
  hasRampAccess?: boolean;
  securityDeposit?: number;
  acceptsSwissCaution?: boolean;
  verifiedAt?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  images?: ListingImage[];
}

export interface Favorite {
  id: number;
  idUser: number;
  user?: User;
  idListing: number;
  listing?: Listing;
  createdAt: string;
}

export interface Message {
  id: number;
  idUser: number;
  idSenderUser: number;
  idReceiverUser: number;
  idListing?: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface SavedSearch {
  id: number;
  idUser: number;
  user?: User;
  searchName: string;
  searchCriteria: string;
  notificationsEnabled: boolean;
  createdAt: string;
}

export interface ListingReport {
  id: number;
  idUser: number;
  user?: User;
  idListing: number;
  listing?: Listing;
  reason: string;
  description: string;
  createdAt: string;
}

export interface ListingFilter {
  ids?: number[];
  userIds?: number[];
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  minSurfaceArea?: number;
  maxSurfaceArea?: number;
  furnishingStatusIds?: number[];
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  petsAllowed?: boolean;
  hasElevator?: boolean;
  hasRampAccess?: boolean;
  acceptsSwissCaution?: boolean;
  isAvailableImmediately?: boolean;
}

export interface CreateOrUpdateListingInput {
  id?: number;
  idCategory?: number;
  idFurnishingStatus?: number;
  idListingStatus?: number;
  title?: string;
  description?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  surfaceArea?: number;
  numberOfRooms?: number;
  floor?: number;
  numberOfBathrooms?: number;
  monthlyRent?: number;
  expensesIncluded?: boolean;
  monthlyExpenses?: number;
  annualAdjustment?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  petsAllowed?: boolean;
  availabilityDate?: string;
  isAvailableImmediately?: boolean;
  minContractDuration?: number;
  rules?: string;
  hasElevator?: boolean;
  hasRampAccess?: boolean;
  securityDeposit?: number;
  acceptsSwissCaution?: boolean;
}

export type Language = 'it' | 'en';

export type SearchFilters = ListingFilter;
