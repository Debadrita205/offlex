import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  StatusBar,
  TextInput,
  AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../components/context';
import Loader from '../components/loader';
import {
  getProfile,
  getUserCategoryList,
  getEmployeeCategoryList,
} from '../service/auth';
import { setProfile } from '../actions/action';
import { CONSTANT } from '../constants';
import Header from '../components/header';
import { Dropdown } from 'react-native-element-dropdown';
import { ImageSlider } from "react-native-image-slider-banner";
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const sliderWidth = Dimensions.get('window').width;
const data = [
  // { label: 'ALL', value: '1' },
  { label: 'BSC', value: '2' },
  { label: 'ETH', value: '3' },

];

const HomeScreen = ({ navigation }) => {
  const state = useSelector(state => state);
  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [flatListItem, setflatListItem] = useState([]);
  const [value, setValue] = useState('2');
  const [isFocus, setIsFocus] = useState(false);
  const [userName, setuserName] = useState('');
  const [searchvalue, setsearchvalue] = useState('');


  useEffect(() => {
    //context.signOut();
    retrieveData();
  }, []);

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_name');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setuserName(JSON.parse(value))
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const searchcustomer = () => {
    if (searchvalue == '') {
      setisLoading(false);
      return Alert.alert('OOPS!', 'Please Enter Customer Account No', [{ text: 'Okay' }]);
    } else {
      setisLoading(true);
      AsyncStorage.getItem('user_token', (err, restoken) => {
        const userToken = JSON.parse(restoken);
        console.log(userToken)
        fetch('https://opflex.nurighana.com/api/search_customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userToken}`,
          },
          body: JSON.stringify({
            account_no: searchvalue
          })
        })
          .then(res => res.json())
          .then(resource => {
            console.log('response from searchcustomer->',resource.data);
            if (resource.status == 'Success') {
              setflatListItem(resource.data)
              setisLoading(false);
            }else{
              return Alert.alert('OOPS!', 'No Data Found', [{ text: 'Okay' }]);
            }
            if(resource.data == ''){
              return Alert.alert('OOPS!', 'No Data Found', [{ text: 'Okay' }]);
            }
          });
      });
    }

  }

  const byClickFilter = (item) => {
    console.log(item.value)
    setValue(item.value);
    setIsFocus(false);
    // if (item.value == '4') {
    //  navigation.navigate('Filter')
    // }
  }


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const renderList = ({ item, index }) => {
    //console.log(item);
    return (
      <TouchableOpacity onPress={() => navigation.push('ServiceDetails',{number:item.account_no})}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#D8E1EE', paddingVertical: 10 }}>

          <View style={{ width: responsiveWidth(85), flexDirection: 'column' }}>
            <Text style={{ color: '#272938', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400' }}>{item.name}</Text>
            <Text style={{ color: '#272B38', fontFamily: 'SFCompactText-Regular', fontSize: 13, fontWeight: '400', marginTop: 10 }}>#{item.account_no}</Text>
          </View>
          <Image
            source={require('../images/down-arrow.png')}
            resizeMode='contain'
            style={{ width: 25, height: 25 }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader loading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <StatusBar animated={true} backgroundColor="#44546A" />
        <Header title={'Search Your Job'} showSearchBar={true} />

        <View style={styles.lineStyle} />
        <View style={{ height: responsiveHeight(15), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#272B38', fontSize: 15, fontWeight: '400', fontFamily: 'SFCompactText-Regular' }}>Welcome Back</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 44, height: 44, borderRadius: 44 / 2, justifyContent: 'center', alignItems: 'center' }}>

              <Image
                style={{ width: responsiveWidth(8), height: responsiveHeight(8) }}
                source={require('../images/avatar.png')}
                resizeMode={'contain'}
              />

            </View>
            <Text style={{ color: '#272B38', fontSize: 14, fontWeight: '400', fontFamily: 'SFCompactText-Regular' }}>{userName}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <Text style={{ color: '#272B38', fontSize: 18, fontWeight: '400', fontFamily: 'SFCompactText-Regular', textAlign: 'center', marginTop: 10 }}>Customer Identification</Text>
        <View style={{ marginBottom: 20, flexDirection: 'row', margin: 10, backgroundColor: '#F4F7FF', width: responsiveWidth(95), height: responsiveHeight(6), borderRadius: 10,borderColor:'#DFE3EF',borderWidth:1 }}>
          <View style={{ width: responsiveWidth(75), }}>
            <TextInput
              style={styles.input}
              placeholder=" Enter Service Point Number"
              placeholderTextColor="#7985AF"
              value={searchvalue}
              onChangeText={(searchvalue) => { setsearchvalue(searchvalue) }}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{ width: responsiveWidth(25), justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => searchcustomer()}>
              <Image
                source={require('../images/search-opflex.png')}
                resizeMode='contain'
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <View style={{ marginHorizontal: 10 }}>
          
          <FlatList
            data={flatListItem}
            renderItem={renderList}
            keyExtractor={(item, index) => index}
            removeClippedSubviews={true}
            maxToRenderPerBatch={60}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  cardStyle: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
    margin: 8,
  },
  textStyle: {
    padding: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  activeMenuView: {
    paddingLeft: 5,
    paddingRight: 5,
    height: responsiveHeight(5),
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2FB3F0'
  },
  activeMenuText: {
    fontSize: 14,
    color: '#2FB3F0',
    marginLeft: 5,
    fontFamily: "SFCompactText-Regular",
    fontWeight: '400'
  },
  inactiveMenuView: {
    paddingLeft: 5,
    paddingRight: 5,
    height: responsiveHeight(5),
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  inactiveMenuText: {
    fontSize: 14,
    color: '#272B38',
    marginLeft: 5,
    fontFamily: "SFCompactText-Regular",
    fontWeight: '400'
  },
  lineStyle2: {
    borderWidth: 3,
    borderColor: '#F4F7FF',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#F4F7FF',
  },
  dropdown: {
    height: responsiveWidth(9),
    width: responsiveWidth(25),
    borderColor: '#D8DFE8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginLeft: responsiveWidth(32),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#3D4255'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#3D4255'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    //backgroundColor: '#F4F7FF',
    color: '#424242',
  },

});
