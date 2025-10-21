import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import FilterModal from '@/components/FilterModal';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useApp();
  const { filteredListings, applyFilters, filters } = useListings();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

  const displayListings = searchQuery
    ? filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredListings;

  const activeFilterCount = Object.keys(filters).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>{t('search')}</Text>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('search_placeholder')}
          showFilterButton
          onFilterPress={() => setFilterModalVisible(true)}
        />
        {activeFilterCount > 0 && (
          <Text style={styles.filterInfo}>
            {activeFilterCount} {activeFilterCount === 1 ? 'filtro attivo' : 'filtri attivi'}
          </Text>
        )}
      </View>

      <FlatList
        data={displayListings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('no_results')}</Text>
          </View>
        }
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        currentFilters={filters}
        t={t}
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
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  filterInfo: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500' as const,
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
