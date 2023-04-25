import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { View, Text, StyleSheet, StatusBar, Image, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SearchBar, CheckBox, Button } from 'react-native-elements';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context';
const Header = props => {
  const { title, showSearchBar, showOtherFilter } = props;
  const [search, setsearch] = useState('');
  const [checked, setchecked] = useState(false);
  const [language, setlanguage] = useState('');
  const context = useContext(AuthContext);
  const navigation = useNavigation();

  const updateSearch = search => {
    setsearch(search);
  };
  const logout = () => {
    AsyncStorage.removeItem('user_token');
    AsyncStorage.removeItem('user_name');
    context.signOut();

  }
  const createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logout() },
    ]);

  return (
    <View style={styles.wrapper}>
      {/* <StatusBar backgroundColor={'#FFFFFF'} barStyle={'light-content'} /> */}
      <View style={styles.leftIconStyle}>

        {title === 'Search Your Job' ? (
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: '#272B38', fontFamily: 'SFCompactText-Regular', fontSize: 18, fontWeight: '400' }}>Service</Text>
          </View>
        ) : <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: '#272B38', fontFamily: 'SFCompactText-Regular', fontSize: 18, fontWeight: '400' }}>History</Text>
        </View>}
        <Text style={styles.headerTitleStyle}></Text>
        {title === 'Search Your Job' ? (
          <View style={styles.rightIconStyle}>
            <TouchableOpacity onPress={() => createTwoButtonAlert()}>
              <Image
                style={styles.imageStyle}
                source={require('../images/logout-opflex.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>

          </View>
        ) : <View style={styles.rightIconStyle}>
        <TouchableOpacity onPress={() => createTwoButtonAlert()}>
          <Image
            style={styles.imageStyle}
            source={require('../images/logout-opflex.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

      </View>}
      </View>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  leftIconStyle: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  headerTitleStyle: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 24,
  },
  rightIconStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: { paddingBottom: 8 },
  subContainer: { flexDirection: 'row' },
  checkboxContainerStyle: {
    backgroundColor: '#FFFFFF00',
    padding: 0,
    borderColor: '#FFFFFF00',
  },
  checkboxTextStyle: { color: '#FFF' },
  pickerStyle: { width: 125 },
  filterSearchContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    width: '49%',
    marginRight: '1%',
  },
  searchbarView: { paddingHorizontal: 16 },
  searchContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
  },
  searchInputStyle: { backgroundColor: 'white' },
  btnTitleStyle: { color: '#000099', fontWeight: 'bold' },
  btnStyle: {
    paddingHorizontal: 30,
    borderRadius: 30,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    marginRight: 10,
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(5)
  },
});
