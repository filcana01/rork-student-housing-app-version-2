import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Home, Maximize, BedDouble, Bath, Calendar, Clock, CheckCircle2, XCircle, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t, isFavorite, toggleFavorite } = useApp();
  const { getListingById } = useListings();
  const listing = getListingById(id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (!listing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Annuncio non trovato</Text>
      </View>
    );
  }

  const isLiked = isFavorite(listing.id);
  const categoryColor = Colors.categories[listing.category];

  const features = [
    { icon: Home, label: t('furnishing'), value: t(listing.furnishing) },
    { icon: Maximize, label: t('surface'), value: `${listing.surface} ${t('sqm')}` },
    ...(listing.rooms ? [{ icon: BedDouble, label: t('rooms'), value: listing.rooms.toString() }] : []),
    { icon: Bath, label: t('bathrooms'), value: listing.bathrooms.toString() },
  ];

  const additionalFeatures = [
    { key: 'terrace', icon: CheckCircle2, label: t('terrace'), value: listing.features.terrace },
    { key: 'garden', icon: CheckCircle2, label: t('garden'), value: listing.features.garden },
    { key: 'petsAllowed', icon: CheckCircle2, label: t('pets_allowed'), value: listing.features.petsAllowed },
    { key: 'accessible', icon: CheckCircle2, label: t('accessible'), value: listing.features.accessible },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {listing.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.imagePagination}>
            {listing.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.favoriteButtonDetail}
            onPress={() => toggleFavorite(listing.id)}
          >
            <Heart
              size={24}
              color={isLiked ? Colors.primary : Colors.white}
              fill={isLiked ? Colors.primary : 'transparent'}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{t(`category_${listing.category}`)}</Text>
          </View>

          <Text style={styles.title}>{listing.title}</Text>

          <View style={styles.locationRow}>
            <MapPin size={18} color={Colors.textSecondary} />
            <Text style={styles.location}>
              {listing.address.street}, {listing.address.city}
            </Text>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>€{listing.price}</Text>
              <Text style={styles.perMonth}>{t('per_month')}</Text>
            </View>
            <Text style={styles.expenses}>
              {listing.expensesIncluded ? t('expenses_included') : 
                `${t('expenses_excluded')} (€${listing.monthlyExpenses || 0}/${t('per_month').replace('/', '')})`
              }
            </Text>
          </View>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <feature.icon size={20} color={Colors.primary} />
                </View>
                <Text style={styles.featureLabel}>{feature.label}</Text>
                <Text style={styles.featureValue}>{feature.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('description')}</Text>
            <Text style={styles.description}>{listing.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('features')}</Text>
            <View style={styles.featuresList}>
              {additionalFeatures.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  {feature.value ? (
                    <CheckCircle2 size={20} color={Colors.success} />
                  ) : (
                    <XCircle size={20} color={Colors.textLight} />
                  )}
                  <Text style={[
                    styles.featureText,
                    !feature.value && styles.featureTextDisabled
                  ]}>
                    {feature.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informazioni Contratto</Text>
            <View style={styles.infoRow}>
              <Calendar size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>
                {t('available_from')}: {new Date(listing.availableFrom).toLocaleDateString('it-IT')}
              </Text>
            </View>
            {listing.minimumContract && (
              <View style={styles.infoRow}>
                <Clock size={18} color={Colors.textSecondary} />
                <Text style={styles.infoText}>
                  {t('minimum_contract')}: {listing.minimumContract} {t('months')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => router.push(`/chat/${listing.idUser}?listingId=${listing.id}`)}
        >
          <Text style={styles.contactButtonText}>{t('contact_owner')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  imageContainer: {
    height: 300,
    position: 'relative' as const,
  },
  image: {
    width,
    height: 300,
  },
  imagePagination: {
    position: 'absolute' as const,
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: Colors.white,
    width: 24,
  },
  favoriteButtonDetail: {
    position: 'absolute' as const,
    top: 60,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  priceSection: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  perMonth: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  expenses: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    width: '48%',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  featureValue: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  featuresList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: Colors.text,
  },
  featureTextDisabled: {
    color: Colors.textLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
