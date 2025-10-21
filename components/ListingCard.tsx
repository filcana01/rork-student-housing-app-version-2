import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Listing } from '@/types';
import { useApp } from '@/contexts/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, t } = useApp();
  const isLiked = isFavorite(listing.id);

  const handlePress = () => {
    router.push(`/listing/${listing.id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const categoryKey = listing.category?.nameEn?.toLowerCase() || 'apartment';
  const categoryColor = Colors.categories[categoryKey as keyof typeof Colors.categories] || Colors.primary;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: listing.images?.[0]?.videoUrl || '' }} 
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Heart 
            size={20} 
            color={isLiked ? Colors.primary : Colors.white}
            fill={isLiked ? Colors.primary : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
        {listing.category && (
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>
              {listing.category.nameIt}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {listing.title}
        </Text>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}>
            {listing.city}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          {listing.surfaceArea && (
            <Text style={styles.surface}>
              {listing.surfaceArea} {t('sqm')}
            </Text>
          )}
          {listing.numberOfRooms && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.detail}>
                {listing.numberOfRooms} {t('rooms')}
              </Text>
            </>
          )}
          {listing.numberOfBathrooms && listing.numberOfBathrooms > 0 && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.detail}>
                {listing.numberOfBathrooms} {t('bathrooms')}
              </Text>
            </>
          )}
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>CHF {listing.monthlyRent}</Text>
          <Text style={styles.perMonth}>{t('per_month')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBadge: {
    position: 'absolute' as const,
    bottom: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  surface: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  dot: {
    fontSize: 13,
    color: Colors.textLight,
  },
  detail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  perMonth: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});
