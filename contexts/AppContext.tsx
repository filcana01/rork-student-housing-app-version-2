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
  const [favorites, setFavorites] = useState<string[]>([]);
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

  const toggleFavorite = useCallback(async (listingId: string) => {
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  }, [favorites]);

  const isFavorite = useCallback((listingId: string): boolean => {
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
      if (listing.status !== 'active') return false;
      
      if (filters.category && listing.category !== filters.category) return false;
      
      if (filters.minPrice && listing.price < filters.minPrice) return false;
      if (filters.maxPrice && listing.price > filters.maxPrice) return false;
      
      if (filters.city && !listing.address.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      
      if (filters.minSurface && listing.surface < filters.minSurface) return false;
      if (filters.maxSurface && listing.surface > filters.maxSurface) return false;
      
      if (filters.rooms && listing.rooms !== filters.rooms) return false;
      if (filters.bathrooms && listing.bathrooms < filters.bathrooms) return false;
      
      if (filters.furnishing && listing.furnishing !== filters.furnishing) return false;
      
      if (filters.terrace && !listing.features.terrace) return false;
      if (filters.garden && !listing.features.garden) return false;
      if (filters.petsAllowed && !listing.features.petsAllowed) return false;
      if (filters.accessible && !listing.features.accessible) return false;
      
      return true;
    });
  }, [listings, filters]);

  const getListingById = useCallback((id: string): Listing | undefined => {
    return listings.find(listing => listing.id === id);
  }, [listings]);

  const applyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getUserListings = useCallback((userId: string): Listing[] => {
    return listings.filter(listing => listing.ownerId === userId);
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
      listing.title.toLowerCase().includes(query) ||
      listing.description.toLowerCase().includes(query) ||
      listing.address.city.toLowerCase().includes(query) ||
      listing.address.street.toLowerCase().includes(query)
    );
  }, [filteredListings, searchQuery]);
}
