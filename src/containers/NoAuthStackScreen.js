import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import PrivacyPolicy from './PrivacyPolicy';
import IdCreation1 from '../containers/auth/IdCreation1';

const NoAuthStack = createStackNavigator();

const NoAuthStackScreen = ({ navigation }) => (
    <NoAuthStack.Navigator headerMode='none'>
        <NoAuthStack.Screen name="SignInScreen" component={SignInScreen} />
        <NoAuthStack.Screen name="SplashScreen" component={SplashScreen} />
        <NoAuthStack.Screen name="IdCreation1" component={IdCreation1} />
        <NoAuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        
    </NoAuthStack.Navigator>
);

export default NoAuthStackScreen;