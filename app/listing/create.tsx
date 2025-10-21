import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Save } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useApp } from '@/contexts/AppContext';
import { mockCategories } from '@/mocks/categories';
import { mockFurnishingStatus } from '@/mocks/furnishing-status';
import { CreateOrUpdateListingInput } from '@/types';

export default function CreateListingScreen() {
  const insets = useSafeAreaInsets();
  const { t, user } = useApp();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<CreateOrUpdateListingInput>({
    idListingStatus: 3,
    expensesIncluded: false,
    annualAdjustment: false,
    hasTerrace: false,
    hasGarden: false,
    hasPool: false,
    petsAllowed: false,
    isAvailableImmediately: false,
    hasElevator: false,
    hasRampAccess: false,
    acceptsSwissCaution: false,
  });

  const updateField = <K extends keyof CreateOrUpdateListingInput>(
    field: K,
    value: CreateOrUpdateListingInput[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = async () => {
    if (!user) {
      Alert.alert('Errore', 'Devi effettuare il login per creare un annuncio');
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Successo', 'Bozza salvata con successo');
      router.back();
    } catch (error) {
      console.error('Save draft error:', error);
      Alert.alert('Errore', 'Impossibile salvare la bozza');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!user) {
      Alert.alert('Errore', 'Devi effettuare il login per creare un annuncio');
      router.push('/login');
      return;
    }

    if (!formData.title || !formData.idCategory || !formData.monthlyRent) {
      Alert.alert('Errore', 'Compila almeno titolo, categoria e prezzo');
      return;
    }

    setLoading(true);
    try {
      console.log('Publishing listing:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Successo', 'Annuncio inviato per verifica');
      router.back();
    } catch (error) {
      console.error('Publish error:', error);
      Alert.alert('Errore', 'Impossibile pubblicare l&apos;annuncio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      <View style={[styles.headerBar, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('create_listing')}</Text>
        <TouchableOpacity
          style={styles.draftButton}
          onPress={handleSaveDraft}
          disabled={loading}
        >
          <Save size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informazioni di Base</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titolo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Es. Camera luminosa vicino USI"
              value={formData.title || ''}
              onChangeText={text => updateField('title', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria *</Text>
            <View style={styles.chipRow}>
              {mockCategories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.chip,
                    formData.idCategory === cat.id && styles.chipSelected
                  ]}
                  onPress={() => updateField('idCategory', cat.id)}
                >
                  <Text style={[
                    styles.chipText,
                    formData.idCategory === cat.id && styles.chipTextSelected
                  ]}>
                    {cat.nameIt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrizione</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrivi l'alloggio..."
              value={formData.description || ''}
              onChangeText={text => updateField('description', text)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indirizzo</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Via e Numero Civico</Text>
            <TextInput
              style={styles.input}
              placeholder="Via Maderno 24"
              value={formData.address || ''}
              onChangeText={text => updateField('address', text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>CAP</Text>
              <TextInput
                style={styles.input}
                placeholder="6900"
                value={formData.postalCode || ''}
                onChangeText={text => updateField('postalCode', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.flex2]}>
              <Text style={styles.label}>Città</Text>
              <TextInput
                style={styles.input}
                placeholder="Lugano"
                value={formData.city || ''}
                onChangeText={text => updateField('city', text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dettagli Immobile</Text>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Superficie (m²)</Text>
              <TextInput
                style={styles.input}
                placeholder="50"
                value={formData.surfaceArea?.toString() || ''}
                onChangeText={text => updateField('surfaceArea', text ? parseInt(text) : undefined)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Locali</Text>
              <TextInput
                style={styles.input}
                placeholder="2"
                value={formData.numberOfRooms?.toString() || ''}
                onChangeText={text => updateField('numberOfRooms', text ? parseInt(text) : undefined)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Piano</Text>
              <TextInput
                style={styles.input}
                placeholder="2"
                value={formData.floor?.toString() || ''}
                onChangeText={text => updateField('floor', text ? parseInt(text) : undefined)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Bagni</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                value={formData.numberOfBathrooms?.toString() || ''}
                onChangeText={text => updateField('numberOfBathrooms', text ? parseInt(text) : undefined)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Arredamento</Text>
            <View style={styles.chipRow}>
              {mockFurnishingStatus.map(status => (
                <TouchableOpacity
                  key={status.id}
                  style={[
                    styles.chip,
                    formData.idFurnishingStatus === status.id && styles.chipSelected
                  ]}
                  onPress={() => updateField('idFurnishingStatus', status.id)}
                >
                  <Text style={[
                    styles.chipText,
                    formData.idFurnishingStatus === status.id && styles.chipTextSelected
                  ]}>
                    {status.nameIt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Costi</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pigione Mensile (CHF) *</Text>
            <TextInput
              style={styles.input}
              placeholder="800"
              value={formData.monthlyRent?.toString() || ''}
              onChangeText={text => updateField('monthlyRent', text ? parseFloat(text) : undefined)}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Spese Incluse</Text>
            <Switch
              value={formData.expensesIncluded || false}
              onValueChange={value => updateField('expensesIncluded', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          {!formData.expensesIncluded && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Spese Mensili (CHF)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="100"
                  value={formData.monthlyExpenses?.toString() || ''}
                  onChangeText={text => updateField('monthlyExpenses', text ? parseFloat(text) : undefined)}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Conguaglio Annuale</Text>
                <Switch
                  value={formData.annualAdjustment || false}
                  onValueChange={value => updateField('annualAdjustment', value)}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            </>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Deposito Cauzionale (CHF)</Text>
            <TextInput
              style={styles.input}
              placeholder="1600"
              value={formData.securityDeposit?.toString() || ''}
              onChangeText={text => updateField('securityDeposit', text ? parseFloat(text) : undefined)}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Accetta Swiss Caution</Text>
            <Switch
              value={formData.acceptsSwissCaution || false}
              onValueChange={value => updateField('acceptsSwissCaution', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caratteristiche</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Terrazza</Text>
            <Switch
              value={formData.hasTerrace || false}
              onValueChange={value => updateField('hasTerrace', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Giardino</Text>
            <Switch
              value={formData.hasGarden || false}
              onValueChange={value => updateField('hasGarden', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Piscina</Text>
            <Switch
              value={formData.hasPool || false}
              onValueChange={value => updateField('hasPool', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Animali Ammessi</Text>
            <Switch
              value={formData.petsAllowed || false}
              onValueChange={value => updateField('petsAllowed', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Ascensore</Text>
            <Switch
              value={formData.hasElevator || false}
              onValueChange={value => updateField('hasElevator', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Accesso con Rampa</Text>
            <Switch
              value={formData.hasRampAccess || false}
              onValueChange={value => updateField('hasRampAccess', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disponibilità</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Disponibile Subito</Text>
            <Switch
              value={formData.isAvailableImmediately || false}
              onValueChange={value => updateField('isAvailableImmediately', value)}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          {!formData.isAvailableImmediately && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data Disponibilità</Text>
              <TextInput
                style={styles.input}
                placeholder="2025-03-01"
                value={formData.availabilityDate || ''}
                onChangeText={text => updateField('availabilityDate', text)}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Durata Minima Contratto (mesi)</Text>
            <TextInput
              style={styles.input}
              placeholder="12"
              value={formData.minContractDuration?.toString() || ''}
              onChangeText={text => updateField('minContractDuration', text ? parseInt(text) : undefined)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regole</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Regole dell&apos;immobile</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Specifica eventuali regole..."
              value={formData.rules || ''}
              onChangeText={text => updateField('rules', text)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.publishButton, loading && styles.buttonDisabled]}
            onPress={handlePublish}
            disabled={loading}
          >
            <Text style={styles.publishButtonText}>
              {loading ? 'Pubblicazione...' : 'Pubblica Annuncio'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  draftButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    backgroundColor: Colors.white,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  publishButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
