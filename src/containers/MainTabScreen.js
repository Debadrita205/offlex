import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import Home from './HomeScreen';
import History from './History';

import { CONSTANT } from '../constants';
import TabBarAdvancedButton from './TabBarAdvancedButton';

const Tab = createBottomTabNavigator();

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderBottomColor: '#2FB3F0', borderBottomWidth: 2 }]
        : props.style
    }
  />
);

const MainTabScreen = ({ navigation }) => {
  const state = useSelector(state => state);
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ showLabel: true,activeTintColor: '#2FB3F0', }}>
      <Tab.Screen
        name="Service"
        component={Home}
        options={{
          tabBarColor: '#000099',
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/service-opflex.png')}
              resizeMode={'contain'}
              style={{height:20,width:20,tintColor: color}}
            />
          ),
         
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarColor: '#000099',
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ color }) => (
            // <TouchableOpacity onPress={()=>navigation.navigate('TransactionValidation')}>
            <Image
              source={require('../images/history-opflex.png')}
              resizeMode={'contain'}
              style={{height:20,width:20,tintColor: color}}
            />
            // </TouchableOpacity>
          ),
        }}
      />
     

    </Tab.Navigator>
  );
};

export default MainTabScreen;
