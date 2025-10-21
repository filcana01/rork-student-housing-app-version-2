import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Bed, CarFront, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CategoryButtonProps {
  categoryId: number;
  categoryName: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryButton({ categoryId, categoryName, label, selected, onPress }: CategoryButtonProps) {
  const iconMap: Record<number, any> = {
    1: Home,
    2: Bed,
    3: CarFront,
    4: MoreHorizontal,
  };
  
  const IconComponent = iconMap[categoryId] || Home;

  const colorMap: Record<number, string> = {
    1: Colors.categories.apartment,
    2: Colors.categories.room,
    3: Colors.categories.parking,
    4: Colors.categories.other,
  };
  
  const categoryColor = colorMap[categoryId] || Colors.primary;

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
