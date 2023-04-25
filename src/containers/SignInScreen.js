import React, { useState, useContext,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TextInput,
  AsyncStorage,
  BackHandler
} from 'react-native';
import { Switch, Button, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';
import { AuthContext } from '../components/context';
import Loader from '../components/loader';
import { signInAPI } from '../service/auth';
import { setEmail, auth } from '../actions/action';


const window = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const state = useSelector(state => state);
  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isvalidUser, setisvalidUser] = useState(false);
  const [isvalidPassword, setisvalidPassword] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [phoneno, setphoneno] = useState('');
  const [pass, setpass] = useState('');

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
  
  const textInputChangePassword = value => {
    if (value.trim().length >= 8) {
      setpassword(value);
      setisvalidPassword(false);
    } else {
      setpassword(value);
      setisvalidPassword(true);
    }
  };
  const checkPhoneno = (str) => {
    setphoneno(str)
  }

  const checkPass = (str) => {
    setpass(str)
  }

  const login = (_email, _password) => {
    setisLoading(true);
    if(phoneno == '' || pass == ''){
      setisLoading(false);
      return Alert.alert('OOPS!', 'Please enter phone no and password', [{ text: 'Okay' }]);
    }else{
      fetch('https://opflex.nurighana.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        mobile: phoneno,
        password: pass,
        // expiresInMins: 60, // optional
      })
    })
      .then(res => res.json())
      .then(resource => {
        console.log(resource);
        if (!resource.data.token) {
          setisLoading(false);
          return Alert.alert('OOPS!', 'Invalid Credentials', [{ text: 'Okay' }]);
        } else {
          setisLoading(false);
          ToastAndroid.show('Login Success', 1000);
          dispatch(auth(resource));
          context.signIn(resource.data.token);
          AsyncStorage.setItem('user_name', JSON.stringify(resource.data.name));
          AsyncStorage.setItem('user_token', JSON.stringify(resource.data.token));
        }
      });
    }
    
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader loading={isLoading} />
      <StatusBar backgroundColor={'#3D4255'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>

        <Image
          style={{ height: responsiveHeight(35), width: window.width, }}
          source={require('../images/image_opflex.png')}
          resizeMode={'cover'}
        />


        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(5) }}>
          <Text style={{ color: '#000000', fontWeight: '500', fontSize: responsiveFontSize(4), fontFamily: 'SFCompactText-Regular' }}>OPFLEX</Text>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', height: responsiveHeight(30), padding: 20, justifyContent: 'center', }}>
          <View style={styles.searchSection}>

            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor="#7985AF"
              value={phoneno}
              onChangeText={(phoneno) => { checkPhoneno(phoneno) }}
              underlineColorAndroid="transparent"
              autoCapitalize='none'
            />

          </View>
          <View style={styles.searchSection}>

            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="#7985AF"
              value={pass}
              onChangeText={(pass) => { checkPass(pass) }}
              underlineColorAndroid="transparent"
              autoCapitalize='none'
              secureTextEntry={true}
            />

          </View>
        </View>
        <TouchableOpacity onPress={() => login()}>
        <View style={styles.button_view}>
          <Button block style={styles.buttonsubmit}>
            <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '500', color: '#fff' }}>Login</Text>
          </Button>
        </View>
        </TouchableOpacity>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(4) }}>
          <Text style={{ color: '#7D7F87', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}>Please read our</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(2) }}>
            <Text style={{ textDecorationLine: 'underline', color: '#2FB3F0', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}>Terms  of Service</Text>
            <Text style={{ color: '#7D7F87', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}> & </Text>
            <Text style={{ textDecorationLine: 'underline', color: '#2FB3F0', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}>Privacy Policy</Text>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  imageStyle: {
    //width: '80%',
    height: 20,
    width: 20,
    marginRight: responsiveWidth(15)
  },
  imageStyle2: {
    height: responsiveHeight(2)
  },
  socialView: {
    flexDirection: "row",
    height: responsiveHeight(7),
    width: responsiveWidth(75),
    borderColor: '#D2D4DC',
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  socialText: {
    fontFamily: 'SFCompactText-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#272B38',

  },
  boldText: {
    fontFamily: 'SFCompactText-Regular',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#272B38'
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
    //paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 10,
    backgroundColor: '#F4F7FF',
    //backgroundColor:'red',
    color: '#424242',
    borderRadius: 10,
    height: responsiveHeight(5),
    borderBottomColor: '#F4F7FF',
    justifyContent: 'center'
  },
  button_view: {
    //marginBottom: 30,
    alignItems: 'center',
    //flex: 1,
  },
  buttonsubmit: {
    backgroundColor: '#2FB3F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderRadius: 15
  },
});
