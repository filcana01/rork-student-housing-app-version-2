import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';
import ListingCard from '@/components/ListingCard';
import { useMemo } from 'react';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { t, favorites } = useApp();
  const { listings } = useListings();

  const favoriteListings = useMemo(() => {
    return listings.filter(listing => favorites.includes(listing.id));
  }, [listings, favorites]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>{t('favorites')}</Text>
        <Text style={styles.subtitle}>
          {favoriteListings.length} {favoriteListings.length === 1 ? 'annuncio salvato' : 'annunci salvati'}
        </Text>
      </View>

      <FlatList
        data={favoriteListings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Heart size={48} color={Colors.textLight} />
            </View>
            <Text style={styles.emptyTitle}>{t('no_favorites')}</Text>
            <Text style={styles.emptyText}>
              Salva gli annunci che ti interessano per trovarli facilmente
            </Text>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    paddingVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
