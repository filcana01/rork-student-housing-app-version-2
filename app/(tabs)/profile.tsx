import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { User, Settings, Home, LogOut, Globe, ChevronRight, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { t, user, language, changeLanguage, logout } = useApp();
  const { getUserListings } = useListings();

  const userListings = user ? getUserListings(user.id) : [];

  const handleLanguageChange = () => {
    const newLang = language === 'it' ? 'en' : 'it';
    changeLanguage(newLang as any);
  };

  const menuItems = [
    {
      icon: Plus,
      label: t('create_listing'),
      value: '',
      onPress: () => router.push('/listing/create'),
    },
    {
      icon: Home,
      label: t('my_listings'),
      value: `${userListings.length} annunci`,
      onPress: () => console.log('My listings'),
    },
    {
      icon: Globe,
      label: t('language'),
      value: language === 'it' ? 'Italiano' : 'English',
      onPress: handleLanguageChange,
    },
    {
      icon: Settings,
      label: t('settings'),
      value: '',
      onPress: () => console.log('Settings'),
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile')}</Text>
        </View>

        {user ? (
          <>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <User size={40} color={Colors.primary} />
              </View>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              {user.isVerified && user.isIndividual && (
                <View style={[styles.roleBadge, { backgroundColor: Colors.badge.verified_student }]}>
                  <Text style={styles.roleText}>{t('verified_student')}</Text>
                </View>
              )}
              {user.isAgency && (
                <View style={[styles.roleBadge, { backgroundColor: Colors.badge.known_company }]}>
                  <Text style={styles.roleText}>{t('known_company')}</Text>
                </View>
              )}
              {user.isAdmin && (
                <View style={[styles.roleBadge, { backgroundColor: Colors.badge.admin }]}>
                  <Text style={styles.roleText}>{t('admin')}</Text>
                </View>
              )}
            </View>

            <View style={styles.menuSection}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconContainer}>
                    <item.icon size={22} color={Colors.text} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                  </View>
                  <ChevronRight size={20} color={Colors.textLight} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
                activeOpacity={0.7}
              >
                <LogOut size={20} color={Colors.error} />
                <Text style={styles.logoutText}>{t('logout')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginTitle}>Accedi al tuo account</Text>
            <Text style={styles.loginSubtitle}>
              Accedi per gestire i tuoi annunci e i preferiti
            </Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>{t('login')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  menuValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.error,
  },
  loginPrompt: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  loginSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
