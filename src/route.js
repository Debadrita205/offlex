import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

import { persistor, store } from './store';

import RootStackScreen from './containers/RootStackScreen';
import NoAuthStackScreen from './containers/NoAuthStackScreen';

import { AuthContext } from './components/context';
import { DropDownHolder } from './components/DropDownNotification';
import SplashScreen from 'react-native-splash-screen';

const route = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const initialLoginState = {
      isLoading: true,
      userToken: null,
    };
  
    const CustomDefaultTheme = {
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333',
      },
    };
  
    // const CustomDarkTheme = {
    //   ...NavigationDarkTheme,
    //   ...PaperDarkTheme,
    //   colors: {
    //     ...NavigationDarkTheme.colors,
    //     ...PaperDarkTheme.colors,
    //     background: '#333333',
    //     text: '#ffffff',
    //   },
    // };
  
    const theme =  CustomDefaultTheme;
  
    const loginReducer = (prevState, action) => {
      switch (action.type) {
        case 'RETRIEVE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          console.log('loginState.isLoading');
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            userToken: null,
            isLoading: false,
          };
        case 'REGISTER':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
      }
    };
  
    const [loginState, dispatch] = React.useReducer(
      loginReducer,
      initialLoginState,
    );
  
    const authContext = React.useMemo(
      () => ({
        signIn: async token => {
          console.log('userToken login success', token);
          try {
            await AsyncStorage.setItem('userToken', token);
          } catch (e) {
            console.log(e);
          }
  
          dispatch({ type: 'LOGIN', token: token });
        },
        signOut: async () => {
          try {
            await AsyncStorage.removeItem('userToken');
          } catch (e) {
            console.log(e);
          }
          dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
        },
        // toggleTheme: () => {
        //   setIsDarkTheme(isDarkTheme => !isDarkTheme);
        // },
      }),
      [],
    );
  
    useEffect(() => {
      SplashScreen.hide();
    console.log('jjjjjjjjjjjj')
      setTimeout(async () => {
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 1000);
    }, []);
  
    if (loginState.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <ActivityIndicator size="large" color="white"/> */}
        </View>
      );
    }
  
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={theme}>
              {loginState.userToken !== null ? (
                <RootStackScreen />
              ) : (
                  <NoAuthStackScreen />
                )}
              <DropdownAlert
                ref={ref => DropDownHolder.setDropDown(ref)}
                closeInterval={6000}
              />
            </NavigationContainer>
          </AuthContext.Provider>
        </PersistGate>
      </Provider>
    );
}

export default route
