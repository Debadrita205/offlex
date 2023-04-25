import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, Text, View, StyleSheet, Image, BackHandler, Alert, TouchableOpacity,SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';
import { setRole } from '../actions/action';
import { CONSTANT } from '../constants';
import { ICON_BACK, ICON_CHECKMARK, NEXT } from '../../constants/Image';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

const IdCreation1 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [characterLength, setcharacterLength] = useState(false);
  const [firstCharacter, setfirstCharacter] = useState(false);
  const [allCharacter, setallCharacter] = useState(false);
  const [userid, setUserid] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  function backAction() {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }



  const checkUserid = (str) => {
    if (str.charAt(0).search(/[a-z]/) == -1) {
      console.log("first charecter must be lower case");
      setfirstCharacter(false);
    } else {
      setfirstCharacter(true);
    }
    if (str.search(/[a-z0-9]/) == -1) {
      console.log("must be lower case");
      setallCharacter(false)
    } else {
      setallCharacter(true)
    }
    if (str.length < 6) {
      console.log("too_short");
      setcharacterLength(false)
    } else {
      setcharacterLength(true)
    }
    if (str.length > 12) {
      console.log("too_long");
      setcharacterLength(false)
    } else {
      setcharacterLength(true)
    }
    //return("ok");
    setUserid(str)
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: responsiveHeight(5) }}>
        <View style={{ marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2), flexDirection: 'row', paddingLeft: 16, paddingRight: 16, alignItems: 'center' }}>
          <View style={styles.backbutton}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack(null)}>
              <Image
                source={require('../../images/back.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>ID Creation</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(16), padding: 20, justifyContent: 'center', }}>
          <Text style={{ color: '#272B38', fontSize: 13, fontWeight: '400', fontFamily: 'SFCompactText-Regular', marginTop: responsiveHeight(2), marginBottom: responsiveHeight(1) }}>Create an ID</Text>

          <View style={styles.searchSection}>

            <TextInput
              style={styles.input}
              placeholder="Insert a new ID"
              placeholderTextColor="#7C7C7C"
              value={userid}
              onChangeText={(userid) => { checkUserid(userid) }}
              underlineColorAndroid="transparent"
              autoCapitalize='none'
            />
            {characterLength && firstCharacter && allCharacter ?
              <Image
                source={require('../../images/check-mark.png')}
                resizeMode='contain'
                style={styles.searchIcon}
              />
              :
              null
            }
          </View>
        </View>
        <View style={styles.lineStyle2} />
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(18), paddingHorizontal: 20, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
            {characterLength ?
              <Text style={{ color: '#2FB3F0', fontSize: 10 }}>{'\u2B24'}</Text>
              :
              <Text style={{ color: '#7C7C7C', fontSize: 10 }}>{'\u2B24'}</Text>
            }
            <Text style={{ color: '#272B38', marginLeft: 10, fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '300' }}>6-12 Characters</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
            {firstCharacter ?
              <Text style={{ color: '#2FB3F0', fontSize: 10 }}>{'\u2B24'}</Text>
              :
              <Text style={{ color: '#7C7C7C', fontSize: 10 }}>{'\u2B24'}</Text>
            }
            <Text style={{ color: '#272B38', marginLeft: 10, fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '300' }}>First character must be a lower-case
              English letter</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
            {allCharacter ?
              <Text style={{ color: '#2FB3F0', fontSize: 10 }}>{'\u2B24'}</Text>
              :
              <Text style={{ color: '#7C7C7C', fontSize: 10 }}>{'\u2B24'}</Text>
            }
            <Text style={{ color: '#272B38', marginLeft: 10, fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '300' }}>Must be lower-case English letter and
              number</Text>
          </View>
        </View>
        <View style={styles.lineStyle2} />
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(39), padding: 20, }}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType='square'
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              tintColors={{ true: '#2FB3F0', false: '#2FB3F0' }}
            />
            <Text style={styles.label}>Reside in the US</Text>
          </View>
          {toggleCheckBox == true ?
            <View style={styles.lineStyle3} />
            : null
          }
          {toggleCheckBox == true ?
            <View style={{}}>
              <Text style={{ padding: 5, color: '#3D4255', fontSize: 13, fontWeight: '300', fontFamily: 'SFCompactText-Regular', marginTop: 5, marginBottom: 5 }}>As per California’s Consumer Privacy Act (CCPA), the resident of California are required to enter their Zip Code.</Text>

              <View style={styles.searchSection}>

                <TextInput
                  style={styles.input}
                  placeholder="Enter your Zip Code"
                  placeholderTextColor="#7C7C7C"
                  //value={this.state.email}
                  //onChangeText={(email) => { this.setState({ email }) }}
                  underlineColorAndroid="transparent"
                />

              </View>
            </View>
            : null
          }
        </View>

        <View style={styles.lineStyle2} />


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', height: responsiveHeight(8), padding: 20, }}>
          <Text style={{ color: '#2FB3F0', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}>Consumer Privacy Act</Text>
          <Image
            source={require('../../images/next.png')}
            resizeMode='contain'
            style={{ width: responsiveWidth(7), height: responsiveHeight(7), }}
          />
        </View>

      </ScrollView>
      <View style={styles.button_view}>
        <Button block style={styles.buttonsubmit} onPress={() => navigation.navigate('OtpSetup1')}>
          <Text style={{ color: '#fff', fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '500' }}>Next</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default IdCreation1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //padding: 16,
    backgroundColor: '#F4F7FF'
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
    borderWidth: 4,
    borderColor: '#F4F7FF',
  },
  lineStyle3: {
    borderWidth: 1,
    borderColor: '#DFE3EF',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: responsiveHeight(1),
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
    height: responsiveHeight(6),
    //width: responsiveWidth(90),
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#DFE3EF',
    borderWidth: 1,
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
    borderRadius: 10,
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
