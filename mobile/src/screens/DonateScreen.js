import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import { PAYPAL_LINK } from '../config/api';

const DonateScreen = ({ navigation }) => {
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [5, 10, 25, 50, 100, 250];

  const handleDonate = async (amount) => {
    try {
      const url = `${PAYPAL_LINK}/${amount}EUR`;
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open PayPal link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open PayPal: ' + error.message);
    }
  };

  const handleCustomDonate = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      handleDonate(amount);
    } else {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
    }
  };

  const openQuickDonate = async () => {
    try {
      const canOpen = await Linking.canOpenURL(PAYPAL_LINK);
      if (canOpen) {
        await Linking.openURL(PAYPAL_LINK);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open PayPal');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💝 Support AegeanSwim</Text>
        <Text style={styles.subtitle}>
          Help us map every safe swimming spot in the Aegean Sea!
        </Text>
      </View>

      {/* What Your Donation Funds */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 What Your Donation Funds</Text>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            Research trips to map 50+ more islands
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            Premium weather API for better accuracy
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            Mobile app development (iOS & Android)
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            Server costs to keep the service running
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            Local beach safety equipment donations
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.listText}>
            My dream Aegean research vacation 🏖️
          </Text>
        </View>
      </View>

      {/* Donation Amounts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Choose Your Support Level</Text>
        <View style={styles.amountsGrid}>
          {donationAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.amountButton}
              onPress={() => handleDonate(amount)}
            >
              <Text style={styles.amountText}>€{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount */}
        <View style={styles.customAmountContainer}>
          <TextInput
            style={styles.customAmountInput}
            placeholder="Custom amount €"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
          />
          <TouchableOpacity
            style={styles.customDonateButton}
            onPress={handleCustomDonate}
          >
            <Text style={styles.customDonateText}>Donate</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Donate Button */}
        <TouchableOpacity style={styles.paypalButton} onPress={openQuickDonate}>
          <Text style={styles.paypalButtonText}>PayPal Quick Donate</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 2025 Funding Goal</Text>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress</Text>
          <Text style={styles.progressAmount}>€3,500 / €10,000</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '35%' }]}>
            <Text style={styles.progressPercentage}>35%</Text>
          </View>
        </View>
        <Text style={styles.progressDescription}>
          We've mapped 30 islands so far! Help us reach our goal to cover all
          227 inhabited Greek islands with swimming safety data. Every euro
          helps provide free beach safety information to thousands of swimmers.
        </Text>
      </View>

      {/* Other Ways to Support */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Other Ways to Support</Text>
        <View style={styles.otherMethods}>
          <TouchableOpacity style={styles.methodButton}>
            <Text style={styles.methodButtonText}>Bitcoin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodButton}>
            <Text style={styles.methodButtonText}>Ethereum</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodButton}>
            <Text style={styles.methodButtonText}>Ko-fi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodButton}>
            <Text style={styles.methodButtonText}>Patreon</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thank You Message */}
      <View style={styles.thankYouCard}>
        <Text style={styles.thankYouText}>
          Thank you for supporting free beach safety information for everyone! 🌊
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkmark: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    width: '30%',
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  amountText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  customAmountContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  customAmountInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e0f2fe',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  customDonateButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  customDonateText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  paypalButton: {
    backgroundColor: '#0070ba',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  paypalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  progressAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0891b2',
  },
  progressBarContainer: {
    height: 40,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  progressPercentage: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  progressDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  otherMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  methodButton: {
    width: '48%',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  methodButtonText: {
    color: '#0c4a6e',
    fontSize: 14,
    fontWeight: '600',
  },
  thankYouCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    marginBottom: 32,
  },
  thankYouText: {
    fontSize: 16,
    color: '#10b981',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DonateScreen;
