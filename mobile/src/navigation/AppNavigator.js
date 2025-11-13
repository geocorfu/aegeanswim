import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import DonateScreen from '../screens/DonateScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0891b2',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerTitle: '🌊 AegeanSwim',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{
          headerTitle: 'Beach Recommendations',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Donate') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0891b2',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Find Beaches',
          }}
        />
        <Tab.Screen
          name="Donate"
          component={DonateScreen}
          options={{
            tabBarLabel: 'Support',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#0891b2',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '700',
            },
            headerTitle: '💝 Support AegeanSwim',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
