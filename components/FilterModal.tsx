import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SearchFilters } from '@/types';
import { useState, useEffect } from 'react';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
  t: (key: string) => string;
}

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply, 
  currentFilters,
  t 
}: FilterModalProps) {
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  const toggleFurnishing = (furnishingId: number) => {
    setFilters(prev => {
      const current = prev.furnishingStatusIds || [];
      const newIds = current.includes(furnishingId)
        ? current.filter(id => id !== furnishingId)
        : [...current, furnishingId];
      return {
        ...prev,
        furnishingStatusIds: newIds.length > 0 ? newIds : undefined
      };
    });
  };

  const toggleFeature = (feature: 'hasTerrace' | 'hasGarden' | 'hasPool' | 'petsAllowed' | 'hasRampAccess' | 'hasElevator' | 'acceptsSwissCaution' | 'isAvailableImmediately') => {
    setFilters(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('filters')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('price_range')}</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="Min €"
                  keyboardType="numeric"
                  value={filters.minPrice?.toString() || ''}
                  onChangeText={text => setFilters(prev => ({ 
                    ...prev, 
                    minPrice: text ? parseInt(text) : undefined 
                  }))}
                />
                <Text style={styles.separator}>-</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Max €"
                  keyboardType="numeric"
                  value={filters.maxPrice?.toString() || ''}
                  onChangeText={text => setFilters(prev => ({ 
                    ...prev, 
                    maxPrice: text ? parseInt(text) : undefined 
                  }))}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('surface')} ({t('sqm')})</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={filters.minSurfaceArea?.toString() || ''}
                  onChangeText={text => setFilters(prev => ({ 
                    ...prev, 
                    minSurfaceArea: text ? parseInt(text) : undefined 
                  }))}
                />
                <Text style={styles.separator}>-</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Max"
                  keyboardType="numeric"
                  value={filters.maxSurfaceArea?.toString() || ''}
                  onChangeText={text => setFilters(prev => ({ 
                    ...prev, 
                    maxSurfaceArea: text ? parseInt(text) : undefined 
                  }))}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('furnishing')}</Text>
              <View style={styles.chipRow}>
                {[
                  { id: 1, labelKey: 'furnished' },
                  { id: 2, labelKey: 'partially_furnished' },
                  { id: 3, labelKey: 'unfurnished' },
                ].map(status => (
                  <TouchableOpacity
                    key={status.id}
                    style={[
                      styles.chip,
                      filters.furnishingStatusIds?.includes(status.id) && styles.chipSelected
                    ]}
                    onPress={() => toggleFurnishing(status.id)}
                  >
                    <Text style={[
                      styles.chipText,
                      filters.furnishingStatusIds?.includes(status.id) && styles.chipTextSelected
                    ]}>
                      {t(status.labelKey)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('features')}</Text>
              <View style={styles.chipRow}>
                {[
                  { key: 'hasTerrace' as const, label: t('terrace') },
                  { key: 'hasGarden' as const, label: t('garden') },
                  { key: 'hasPool' as const, label: t('pool') },
                  { key: 'petsAllowed' as const, label: t('pets_allowed') },
                  { key: 'hasRampAccess' as const, label: t('accessible') },
                  { key: 'hasElevator' as const, label: t('elevator') },
                ].map(feature => (
                  <TouchableOpacity
                    key={feature.key}
                    style={[
                      styles.chip,
                      filters[feature.key] && styles.chipSelected
                    ]}
                    onPress={() => toggleFeature(feature.key)}
                  >
                    <Text style={[
                      styles.chipText,
                      filters[feature.key] && styles.chipTextSelected
                    ]}>
                      {feature.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('availability')}</Text>
              <View style={styles.chipRow}>
                {[
                  { key: 'isAvailableImmediately' as const, label: t('available_immediately') },
                  { key: 'acceptsSwissCaution' as const, label: t('swiss_caution') },
                ].map(feature => (
                  <TouchableOpacity
                    key={feature.key}
                    style={[
                      styles.chip,
                      filters[feature.key] && styles.chipSelected
                    ]}
                    onPress={() => toggleFeature(feature.key)}
                  >
                    <Text style={[
                      styles.chipText,
                      filters[feature.key] && styles.chipTextSelected
                    ]}>
                      {feature.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>{t('reset_filters')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>{t('apply_filters')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.text,
  },
  chipTextSelected: {
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
