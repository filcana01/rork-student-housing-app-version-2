import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, User, Listing, SearchFilters } from '@/types';
import { translations } from '@/constants/translations';
import { mockListings } from '@/mocks/listings';
import { currentUser } from '@/mocks/users';

export const [AppProvider, useApp] = createContextHook(() => {
  const [language, setLanguage] = useState<Language>('it');
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedLang, storedFavorites, storedUser] = await Promise.all([
        AsyncStorage.getItem('language'),
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('user'),
      ]);

      if (storedLang) {
        setLanguage(storedLang as Language);
      }
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const changeLanguage = useCallback(async (newLang: Language) => {
    setLanguage(newLang);
    await AsyncStorage.setItem('language', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const login = useCallback(async (email: string, password: string) => {
    console.log('Login attempt:', email);
    setUser(currentUser);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(currentUser));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
  }, []);

  const toggleFavorite = useCallback(async (listingId: number) => {
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  }, [favorites]);

  const isFavorite = useCallback((listingId: number): boolean => {
    return favorites.includes(listingId);
  }, [favorites]);

  return useMemo(() => ({
    language,
    changeLanguage,
    t,
    user,
    isAuthenticated,
    login,
    logout,
    favorites,
    toggleFavorite,
    isFavorite,
  }), [language, changeLanguage, t, user, isAuthenticated, login, logout, favorites, toggleFavorite, isFavorite]);
});

export const [ListingsProvider, useListings] = createContextHook(() => {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [filters, setFilters] = useState<SearchFilters>({});

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      if (listing.listingStatus?.id !== 4) return false;
      
      if (filters.categoryIds && filters.categoryIds.length > 0 && listing.idCategory) {
        if (!filters.categoryIds.includes(listing.idCategory)) return false;
      }
      
      if (filters.minPrice && listing.monthlyRent && listing.monthlyRent < filters.minPrice) return false;
      if (filters.maxPrice && listing.monthlyRent && listing.monthlyRent > filters.maxPrice) return false;
      
      if (filters.city && listing.city && !listing.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      
      if (filters.minSurfaceArea && listing.surfaceArea && listing.surfaceArea < filters.minSurfaceArea) return false;
      if (filters.maxSurfaceArea && listing.surfaceArea && listing.surfaceArea > filters.maxSurfaceArea) return false;
      
      if (filters.furnishingStatusIds && filters.furnishingStatusIds.length > 0 && listing.idFurnishingStatus) {
        if (!filters.furnishingStatusIds.includes(listing.idFurnishingStatus)) return false;
      }
      
      if (filters.hasTerrace && !listing.hasTerrace) return false;
      if (filters.hasGarden && !listing.hasGarden) return false;
      if (filters.hasPool && !listing.hasPool) return false;
      if (filters.petsAllowed && !listing.petsAllowed) return false;
      if (filters.hasRampAccess && !listing.hasRampAccess) return false;
      if (filters.hasElevator && !listing.hasElevator) return false;
      if (filters.acceptsSwissCaution && !listing.acceptsSwissCaution) return false;
      if (filters.isAvailableImmediately && !listing.isAvailableImmediately) return false;
      
      return true;
    });
  }, [listings, filters]);

  const getListingById = useCallback((id: number): Listing | undefined => {
    return listings.find(listing => listing.id === id);
  }, [listings]);

  const applyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getUserListings = useCallback((userId: number): Listing[] => {
    return listings.filter(listing => listing.idUser === userId);
  }, [listings]);

  return useMemo(() => ({
    listings,
    filteredListings,
    filters,
    applyFilters,
    resetFilters,
    getListingById,
    getUserListings,
  }), [listings, filteredListings, filters, applyFilters, resetFilters, getListingById, getUserListings]);
});

export function useFilteredListings(searchQuery?: string) {
  const { filteredListings } = useListings();
  
  return useMemo(() => {
    if (!searchQuery) return filteredListings;
    
    const query = searchQuery.toLowerCase();
    return filteredListings.filter(listing => 
      (listing.title && listing.title.toLowerCase().includes(query)) ||
      (listing.description && listing.description.toLowerCase().includes(query)) ||
      (listing.city && listing.city.toLowerCase().includes(query)) ||
      (listing.address && listing.address.toLowerCase().includes(query))
    );
  }, [filteredListings, searchQuery]);
}
