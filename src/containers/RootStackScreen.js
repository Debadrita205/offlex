import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerContent from './DrawerContent';
import MainTabScreen from './MainTabScreen';

import BackHeader from '../components/backHeader.component';
import History from './History';
import Home from './HomeScreen';
import ServiceDetails from './ServiceDetails';
import ScanScreen from './ScanScreen';
import MaterialConsumed from './MaterialConsumed';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator>
        <RootStack.Screen
            name="HomeDrawer"
            component={MainTabScreen}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="Drawer"
            component={DrawerContent}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="History"
            component={History}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="Home"
            component={MainTabScreen}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="ServiceDetails"
            component={ServiceDetails}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="ScanScreen"
            component={ScanScreen}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="MaterialConsumed"
            component={MaterialConsumed}
            options={{headerShown: false}}
        />
    </RootStack.Navigator>
);

export default RootStackScreen;
