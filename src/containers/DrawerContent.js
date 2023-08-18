import React, {useContext, useState} from 'react'; 
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CONSTANT} from '../constants';
import {useSelector} from 'react-redux';
import {AuthContext} from '../components/context';
import {color} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = props => {
  const state = useSelector(state => state);
  const context = useContext(AuthContext);
  const [route, setRoute] = useState(null);

  const handleNext = (position, nav) => {
    setRoute(position);
    props.navigation.navigate(nav);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#060f6a" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../images/image_bg.png')}
          style={styles.bgImage}
        />
        <View style={styles.windowClose}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="window-close" color={'#FFFFFF'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri: CONSTANT.PROFILE_URL + state.profile.data.photo_url,
                }}
              />
              <View style={styles.editIconStyle}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <Icon name="pencil-outline" color={'#000099'} size={24} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.profileName}>
              {state.role == CONSTANT.JOBSEEKER
                ? state.profile.data.name
                : state.profile.data.username}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          {state.role === CONSTANT.ROLE.JOBSEEKER ? (
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(0, 'Profile');
                  // navigation.navigate('Profile');
                }}>
                <Icon
                  name="account-outline"
                  color={route === 0 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 0 ? '#000099' : '#566573',
                  }}>
                  Profile Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(1, 'Professional');
                  // navigation.navigate('Professional');
                }}>
                <Icon
                  name="account-tie"
                  color={route === 1 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 1 ? '#000099' : '#566573',
                  }}>
                  Professional Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(2, 'Resume');
                  // props.navigation.navigate('Resume');
                }}>
                <Icon
                  name="file-document-edit-outline"
                  color={route === 2 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 2 ? '#000099' : '#566573',
                  }}>
                  Upload Resume
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(3, 'Subscription');
                  //navigation.navigate('Subscription');
                }}>
                <Icon
                  name="bell-circle-outline"
                  color={route === 3 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 3 ? '#000099' : '#566573',
                  }}>
                  Subscription Plan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(4, 'AppliedJobs');
                  // navigation.navigate('AppliedJobs');
                }}>
                <Icon
                  name="briefcase-outline"
                  color={route === 4 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 4 ? '#000099' : '#566573',
                  }}>
                  Applied Jobs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  handleNext(5, 'ChangePassword');
                  // navigation.navigate('ChangePassword');
                }}>
                <Icon
                  name="lock"
                  color={route === 5 ? '#000099' : '#566573'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.menuText,
                    color: route === 5 ? '#000099' : '#566573',
                  }}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            state.role === CONSTANT.ROLE.EMPLOYEE && (
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menu}
                  onPress={() => {
                    handleNext(0, 'Profile');
                    // navigation.navigate('Profile');
                  }}>
                  <Icon
                    name="account-outline"
                    color={route === 0 ? '#000099' : '#566573'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.menuText,
                      color: route === 0 ? '#000099' : '#566573',
                    }}>
                    Profile Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menu}
                  onPress={() => {
                    handleNext(1, 'Subscription');
                    // navigation.navigate('Subscription');
                  }}>
                  <Icon
                    name="bell-circle-outline"
                    color={route === 1 ? '#000099' : '#566573'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.menuText,
                      color: route === 1 ? '#000099' : '#566573',
                    }}>
                    Subscription Plan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menu}
                  >
                  <Icon
                    name="briefcase-outline"
                    color={route === 2 ? '#000099' : '#566573'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.menuText,
                      color: route === 2 ? '#000099' : '#566573',
                    }}>
                    My Job
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menu}
                  onPress={() => {
                    handleNext(3, 'ChangePassword');
                    navigation.navigate('ChangePassword');
                  }}>
                  <Icon
                    name="lock"
                    color={route === 3 ? '#000099' : '#566573'}
                    size={24}
                  />
                  <Text
                    style={{
                      ...styles.menuText,
                      color: route === 3 ? '#000099' : '#566573',
                    }}>
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            )
          )}
          <View style={styles.horizontalLine} />
          <View>
            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={() => {
                context.signOut();
              }}>
              <Icon name="logout" color={'#000000'} size={24} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 64,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 64,
    elevation: 5,
    alignItems: 'center',
  },
  imageStyle: {
    height: 130,
    width: 130,
    borderRadius: 64,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  editIconStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    elevation: 5,
  },
  profileName: {
    color: '#000099',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 16,
  },
  menuContainer: {
    paddingHorizontal: 8,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgrey',
    marginVertical: 16,
  },
  bgImage: {position: 'absolute', height: 140, width: '100%'},
  windowClose: {position: 'absolute', right: 10, top: 10},
  menu: {flexDirection: 'row', marginVertical: 16, alignItems: 'center'},
  menuText: {
    // color: '#566573',
    marginLeft: 16,
    fontSize: 18,
  },
  logoutContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  logoutText: {color: '#000000', marginLeft: 16, fontSize: 18},
});
