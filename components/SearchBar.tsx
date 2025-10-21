import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onFilterPress?: () => void;
  showFilterButton?: boolean;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder,
  onFilterPress,
  showFilterButton = false,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
        />
      </View>
      {showFilterButton && (
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal size={20} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
