import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';
import { mockCategories } from '@/mocks/categories';
import SearchBar from '@/components/SearchBar';
import CategoryButton from '@/components/CategoryButton';
import ListingCard from '@/components/ListingCard';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useApp();
  const { filteredListings, applyFilters, filters } = useListings();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryPress = (categoryId: number) => {
    const currentIds = filters.categoryIds || [];
    if (currentIds.includes(categoryId)) {
      const newIds = currentIds.filter(id => id !== categoryId);
      applyFilters({ ...filters, categoryIds: newIds.length > 0 ? newIds : undefined });
    } else {
      applyFilters({ ...filters, categoryIds: [categoryId] });
    }
  };

  const displayListings = searchQuery
    ? filteredListings.filter(listing =>
        (listing.title && listing.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (listing.description && listing.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (listing.city && listing.city.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredListings;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>{t('app_name')}</Text>
        <Text style={styles.subtitle}>Trova il tuo alloggio ideale</Text>
      </View>

      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('search_placeholder')}
        />
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>{t('categories')}</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {mockCategories.map(cat => (
            <CategoryButton
              key={cat.id}
              categoryId={cat.id}
              categoryName={cat.nameIt}
              label={cat.nameIt}
              selected={filters.categoryIds?.includes(cat.id) || false}
              onPress={() => handleCategoryPress(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={displayListings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('no_results')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoriesSection: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
