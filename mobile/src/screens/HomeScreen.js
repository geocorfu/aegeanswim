import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BeachService from '../services/BeachService';
import { ISLAND_EMOJIS } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const [islands, setIslands] = useState([]);
  const [selectedIsland, setSelectedIsland] = useState('');
  const [selectedTime, setSelectedTime] = useState('morning');
  const [selectedDate, setSelectedDate] = useState(getTomorrowDate());
  const [loading, setLoading] = useState(false);
  const [loadingIslands, setLoadingIslands] = useState(true);

  // Time options
  const timeOptions = [
    { label: '🌅 Early Morning (6-9 AM)', value: 'early-morning' },
    { label: '☀️ Morning (9-12 PM)', value: 'morning' },
    { label: '🌞 Midday (12-3 PM)', value: 'midday' },
    { label: '🌤️ Afternoon (3-6 PM)', value: 'afternoon' },
    { label: '🌇 Evening (6-8 PM)', value: 'evening' },
  ];

  // Load islands on mount
  useEffect(() => {
    loadIslands();
  }, []);

  const loadIslands = async () => {
    try {
      setLoadingIslands(true);
      const data = await BeachService.getIslands();
      setIslands(data.islands || []);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoadingIslands(false);
    }
  };

  const handleFindBeaches = async () => {
    if (!selectedIsland) {
      Alert.alert('Required', 'Please select an island');
      return;
    }

    try {
      setLoading(true);
      const recommendations = await BeachService.getBeachRecommendations(
        selectedIsland,
        selectedDate,
        selectedTime
      );

      // Navigate to results screen
      navigation.navigate('Recommendations', {
        island: selectedIsland,
        date: selectedDate,
        time: selectedTime,
        data: recommendations,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌊 AegeanSwim</Text>
        <Text style={styles.subtitle}>
          Find perfect swimming beaches based on real-time wind conditions
        </Text>
      </View>

      {/* Beach Finder Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔍 Find Your Perfect Beach</Text>

        {/* Island Selector */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Choose Your Island</Text>
          {loadingIslands ? (
            <ActivityIndicator size="large" color="#0891b2" />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedIsland}
                onValueChange={(value) => setSelectedIsland(value)}
                style={styles.picker}
              >
                <Picker.Item label="Select an island..." value="" />
                {islands.map((island) => (
                  <Picker.Item
                    key={island.id}
                    label={`${ISLAND_EMOJIS[island.id] || '🏝️'} ${island.name}`}
                    value={island.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {/* Time Selector */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Preferred Time</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTime}
              onValueChange={(value) => setSelectedTime(value)}
              style={styles.picker}
            >
              {timeOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Find Beaches Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleFindBeaches}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>🔍 Find Perfect Beaches</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Why AegeanSwim?</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🌬️</Text>
          <Text style={styles.featureTitle}>Real-Time Wind Analysis</Text>
          <Text style={styles.featureDescription}>
            Live weather data analyzing wind patterns and Meltemi conditions
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🗺️</Text>
          <Text style={styles.featureTitle}>30+ Islands Coverage</Text>
          <Text style={styles.featureDescription}>
            100+ beaches across Cyclades, Dodecanese, and North Aegean
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🛡️</Text>
          <Text style={styles.featureTitle}>Geographical Protection</Text>
          <Text style={styles.featureDescription}>
            Smart algorithms calculate wind shelter from natural formations
          </Text>
        </View>
      </View>

      {/* Support Button */}
      <TouchableOpacity
        style={styles.supportButton}
        onPress={() => navigation.navigate('Donate')}
      >
        <Text style={styles.supportButtonText}>💝 Support AegeanSwim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Helper function
function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f2fe',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0891b2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#0369a1',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pickerContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0f2fe',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuresSection: {
    margin: 16,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0c4a6e',
    textAlign: 'center',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  supportButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  supportButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default HomeScreen;
