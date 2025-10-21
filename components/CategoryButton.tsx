import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Bed, CarFront, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ListingCategory } from '@/types';

interface CategoryButtonProps {
  category: ListingCategory;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryButton({ category, label, selected, onPress }: CategoryButtonProps) {
  const IconComponent = {
    apartment: Home,
    room: Bed,
    parking: CarFront,
    other: MoreHorizontal,
  }[category];

  const categoryColor = Colors.categories[category];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected && { backgroundColor: categoryColor, borderColor: categoryColor }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent 
        size={20} 
        color={selected ? Colors.white : Colors.text} 
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 6,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.text,
  },
  labelSelected: {
    color: Colors.white,
  },
});
