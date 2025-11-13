import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ISLAND_EMOJIS } from '../config/api';

const RecommendationsScreen = ({ route, navigation }) => {
  const { island, date, time, data } = route.params;

  const getProtectionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return '#10b981';
      case 'good':
        return '#3b82f6';
      case 'moderate':
        return '#f59e0b';
      case 'rough':
      case 'choppy':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const formatIslandName = (islandId) => {
    const emoji = ISLAND_EMOJIS[islandId] || '🏝️';
    const name = islandId.charAt(0).toUpperCase() + islandId.slice(1);
    return `${emoji} ${name}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏖️ Beach Recommendations</Text>
        <Text style={styles.subtitle}>{formatIslandName(island)}</Text>
        <View style={styles.weatherCard}>
          <Text style={styles.weatherText}>
            🌡️ {Math.round(data.averageTemperature)}°C
          </Text>
          <Text style={styles.weatherText}>
            💨 {data.topRecommendation.weather.windSpeed} km/h{' '}
            {data.topRecommendation.weather.windDirectionText}
          </Text>
          {data.meltemiConditions && (
            <Text style={[styles.weatherText, styles.meltemiWarning]}>
              ⚠️ Meltemi Conditions
            </Text>
          )}
          <Text style={styles.weatherSource}>
            Data: {data.topRecommendation.weather.source}
          </Text>
        </View>
      </View>

      {/* Beach Results */}
      {data.allRecommendations.map((beach, index) => {
        const isTopRecommendation = index === 0;
        const protectionColor = getProtectionColor(beach.protection.swimmingConditions);

        return (
          <View
            key={index}
            style={[
              styles.beachCard,
              isTopRecommendation && styles.topRecommendation,
            ]}
          >
            {isTopRecommendation && (
              <View style={styles.topBadge}>
                <Text style={styles.topBadgeText}>🏆 BEST CHOICE</Text>
              </View>
            )}

            {/* Beach Name */}
            <View style={styles.beachHeader}>
              <Text style={styles.beachName}>
                {isTopRecommendation && '🏖️ '}
                {beach.name}
              </Text>
              <View
                style={[
                  styles.conditionBadge,
                  { backgroundColor: protectionColor },
                ]}
              >
                <Text style={styles.conditionBadgeText}>
                  {beach.protection.swimmingConditions}
                </Text>
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {beach.protection.effectiveWindSpeed} km/h
                </Text>
                <Text style={styles.metricLabel}>Effective Wind</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {Math.round(beach.weather.temperature)}°C
                </Text>
                <Text style={styles.metricLabel}>Temperature</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {beach.protection.windReduction}%
                </Text>
                <Text style={styles.metricLabel}>Wind Block</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {beach.protection.meltemiProtection.toUpperCase()}
                </Text>
                <Text style={styles.metricLabel}>Meltemi Shield</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{beach.score}/100</Text>
                <Text style={styles.metricLabel}>Swim Score</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{beach.description}</Text>
              {beach.protection.originalWindSpeed >
                beach.protection.effectiveWindSpeed && (
                <Text style={styles.protectionInfo}>
                  🛡️ Protection: Wind reduced from{' '}
                  {beach.protection.originalWindSpeed} to{' '}
                  {beach.protection.effectiveWindSpeed} km/h
                </Text>
              )}
            </View>
          </View>
        );
      })}

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Search Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f2fe',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0c4a6e',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: 12,
  },
  weatherCard: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    color: '#0369a1',
    marginVertical: 2,
  },
  meltemiWarning: {
    color: '#f59e0b',
    fontWeight: '700',
  },
  weatherSource: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  beachCard: {
    margin: 12,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#0891b2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRecommendation: {
    borderLeftColor: '#10b981',
    borderLeftWidth: 6,
    backgroundColor: '#f0fdf4',
  },
  topBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  topBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  beachHeader: {
    marginBottom: 15,
  },
  beachName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  conditionBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricItem: {
    width: '30%',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0891b2',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    marginTop: 2,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  protectionInfo: {
    fontSize: 13,
    color: '#10b981',
    marginTop: 8,
    fontWeight: '600',
  },
  backButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#0891b2',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RecommendationsScreen;
