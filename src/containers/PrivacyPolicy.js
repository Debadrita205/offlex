import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, Text, View, StyleSheet, Image, BackHandler, Alert, TouchableOpacity,StatusBar,SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';
import { setRole } from '../actions/action';
import { CONSTANT } from '../constants';

const PrivacyPolicy = ({ navigation }) => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  useEffect(() => {
    // BackHandler.addEventListener('hardwareBackPress', backAction);
    // return () => {
    //   BackHandler.removeEventListener('hardwareBackPress', backAction);
    // };
  }, []);

  // function backAction() {
  //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     { text: 'YES', onPress: () => BackHandler.exitApp() },
  //   ]);
  //   return true;
  // }

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={'#44546A'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: responsiveHeight(0)}}>
        <View style={{ marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2), flexDirection: 'row', paddingLeft: 16, paddingRight: 16, alignItems: 'center', }}>
          <View style={styles.backbutton}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Image
                source={require('../images/back.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Agreements</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(40), padding: 5, marginLeft: 5 }}>
          <Text style={{fontFamily:'SFCompactText-Regular', color: '#272B38', fontSize: 14,fontWeight:'400', marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>Terms of Service</Text>
          <Text style={{fontFamily:'SFCompactText-Regular', padding: 5, color: '#272B38', fontSize: 13,fontWeight:'400', marginBottom: 2, }}>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            voluptate velit esse cillum dolore eu fugiat  officia deserunt mollit anim id est...
          </Text>
          <Text style={{fontFamily:'SFCompactText-Regular',fontSize:13,fontWeight:'300', padding: 5, textDecorationLine: 'underline', }}>Read more</Text>
          <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2, alignItems: 'center', marginLeft: 5 }}>
            <Image
              source={require('../images/checked.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20, }}
            />
            <Text style={{fontFamily:'SFCompactText-Regular',fontSize:13,fontWeight:'300', color: '#272B38', marginLeft: 10 }}>Age of 19 or older</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center', marginLeft: 5 }}>
            <Image
              source={require('../images/checked.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20, }}
            />
            <Text style={{fontFamily:'SFCompactText-Regular',fontSize:13,fontWeight:'300', color: '#272B38', marginLeft: 10}}>Accept the Terms of Service
              </Text>
          </View>
        </View>
        <View style={styles.lineStyle2} />
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(35), padding: 5, marginLeft: 5 }}>
          <Text style={{ fontFamily:'SFCompactText-Regular', color: '#272B38', fontSize: 14,fontWeight:'400', marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>Privacy Policy</Text>
          <Text style={{ fontFamily:'SFCompactText-Regular', padding: 5, color: '#272B38', fontSize: 13,fontWeight:'400', marginBottom: 5, }}>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            voluptatepteur sint obcaecat cupiditat non proide.nt, sunt in culpa qui officia deserunt mollit anim id est...
          </Text>
          <Text style={{fontFamily:'SFCompactText-Regular',fontSize:14, padding: 5, textDecorationLine: 'underline', }}>Read more</Text>
        </View>
        <View style={styles.lineStyle3} />
        {/* <View style={{ flexDirection: "row",alignItems: 'center',backgroundColor: '#FFFFFF', height: responsiveHeight(10), padding: 10, }}>
          
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType='square'
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              tintColors={{ true: '#2FB3F0', false: '#2FB3F0' }}
            />
            <Text style={styles.label}>Accept the Terms of Service</Text>
         
        </View> */}
        <View>
          {/* <Button
          style={styles.buttonStyle}
          onPress={() => {
            //dispatch(setRole(CONSTANT.ROLE.JOBSEEKER));
            navigation.navigate('SignInScreen');
          }}
          color={'#2FB3F0'}
          buttonColor={'#2FB3F0'}
          mode="contained"
        >
          Next
        </Button> */}
          

        </View>
      </ScrollView>
      {/* <View style={styles.button_view}>
            <Button block style={styles.buttonsubmit} onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={{ color: '#fff', fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '500' }}>Next</Text>
            </Button>
          </View> */}
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //padding: 16,
    backgroundColor: '#FFFFFF'
  },
  buttonStyle: {
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    //borderRadius: 25,
    marginVertical: 10,
  },
  backbutton: {
    alignItems: "flex-start"
  },
  headerText: {
    fontFamily: 'SFCompactText-Regular',
    fontWeight: '400',
    color: '#272B38',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '400'
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#DFE3EF',
  },
  lineStyle2: {
    borderWidth: 3,
    borderColor: '#F4F7FF',
  },
  lineStyle3: {
    borderWidth: 0.5,
    borderColor: '#DFE3EF',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  checkboxx: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: '#3D4255',
    fontSize: 13,
    fontFamily: 'SFCompactText-Regular',
    fontWeight: '300'
  },
  searchSection: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    height: responsiveHeight(7),
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#DFE3EF',
    borderWidth: 0.5,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#F4F7FF',
    color: '#424242',
  },
  searchIcon: {
    padding: 10,
    margin: 10,
    height: responsiveHeight(4),
    width: responsiveWidth(4),
  },
  button_view: {
    //marginBottom: 30,
    alignItems: 'center',
    //flex: 1,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  buttonsubmit: {
    backgroundColor: '#2FB3F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(100),
    borderRadius: 0
  },
  lineStyle4: {
    borderWidth: 0.5,
    borderColor: '#DFE3EF',
    marginTop: responsiveHeight(10)
  }
});
