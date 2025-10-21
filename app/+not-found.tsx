import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Home } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pagina non trovata' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Pagina non trovata</Text>
        <Text style={styles.description}>
          La pagina che stai cercando non esiste o è stata rimossa.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Home size={20} color={Colors.white} />
            <Text style={styles.buttonText}>Torna alla Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 72,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
