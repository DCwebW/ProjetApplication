import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Details from '../screens/Details';
import HomeNavigator from './HomeNavigator';
import Actions from '../screens/Actions';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import RechTerrainNavigator from './RechTerrainNavigator';
import PropTypes from 'prop-types';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ route, focused, color, size }) => {
  let iconName;
  let iconColor;

  if (route.name === 'PageAccueil') {
    iconName = 'home';
    iconColor = 'white';
  }
  if (route.name === 'Details') {
    iconName = 'cogs';
    iconColor = 'white';
  }
  if (route.name === 'Recherche') {
    iconName = 'search';
    iconColor = 'white';
  }
  if (route.name === 'Actions') {
    iconName = 'plus';
    iconColor = 'white';
  }

  if (!route.name === focused) {
    iconColor = 'rgba(197, 44, 35,1)';
  }

  return <FontAwesome5 name={iconName} size={size} color={iconColor} />;
};

TabBarIcon.propTypes = {
  route: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

TabBarIcon.defaultProps = {
  color: 'white',
  size: 24,
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'rgba(197, 44, 35,1)',
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 2,
          borderTopColor: 'rgba( 20, 118, 199,0.3)',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              backgroundColor: 'rgba(197, 44, 35,0.8)',
            }}
          />
        ),
      })}
    >
      <Tab.Screen name="PageAccueil" component={HomeNavigator} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Details" component={Details} options={{ title: 'Details' }} />
      <Tab.Screen name="Actions" component={Actions} options={{ title: 'Actions' }} />
      <Tab.Screen name="Recherche" component={RechTerrainNavigator} options={{ title: 'Recherche' }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
