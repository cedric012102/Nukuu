import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {LogoTitle} from '../components/LogoTitle';
import {MoreOptionsOverlay} from '../components/MoreOptionsOverlay';

import QuoteScreen from '../pages/QuoteScreen';
import FavoritesScreen from '../pages/FavoritesScreen';
import FeedbackPrivacyScreen from '../pages/FeedbackPrivacyScreen';
import SendFeedbackScreen from '../pages/SendFeedbackScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Feedstack = ({navigation}) => (
  <Stack.Navigator>
      <Stack.Screen
      name="Quote"
      component={QuoteScreen}
      options={{
        headerTitle: props => <LogoTitle />,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'red',
          fontFamily: 'Georgia',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
          backgroundColor: '#9FA4A9',
        },
      }}
    />

  </Stack.Navigator>
);

const FavoritesStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorite"
      component={FavoritesScreen}
      options={{
        headerTitle: props => <LogoTitle />,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'red',
          fontFamily: 'Georgia',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
          backgroundColor: '#9FA4A9',
        },
      }}
    />
  </Stack.Navigator>
);

const SettingsStack = ({navigation}) => (
  <Stack.Navigator
    initialRouteName={'MoreOptionsOverlay'}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="MoreOptionsOverlay" component={MoreOptionsOverlay} />
    <Stack.Screen
      name="Feedback/Privacy"
      component={FeedbackPrivacyScreen}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="Send Feedback"
      component={SendFeedbackScreen}
      options={{headerShown: true}}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisible = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
  };

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#2e64e5',
      }}
    >
      <Tab.Screen
        name="Quotes"
        component={Feedstack}
        options={{
          tabBarLabel: 'Quotes',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="format-quote-close"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="more-horiz" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
