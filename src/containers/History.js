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
  Platform,
  PermissionsAndroid,
  AsyncStorage
} from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Loader from '../components/loader';
import Header from '../components/header';
const History = (props) => {
  const { navigation, route } = props;
  const [flatListItem, setflatListItem] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!')
      getService()
    });
  return unsubscribe;
    
  }, [navigation]);
  const getService = () => {
    setisLoading(true)
    AsyncStorage.getItem('user_token', (err, restoken) => {
      const userToken = JSON.parse(restoken);
      console.log(userToken)
      fetch('https://opflex.nurighana.com/api/service_list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userToken}`,
        },
      })
        .then(res => res.json())
        .then(resource => {

          if (resource.status == 'success') {
            console.log(resource, 'serviceeeeeeeeeee')
            setflatListItem(resource.details);
            setisLoading(false)

          }
        });
    });
  }
  const renderList = ({ item, index }) => {
    return (
      <View>
        <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#3D4255', padding: 10, paddingHorizontal: 15 }}>{item.date}</Text>

        <View style={{ paddingHorizontal: 15, height: responsiveHeight(10), width: responsiveWidth(100), borderBottomColor: '#B8BED6', borderBottomWidth: 1, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#272938', }}>{item.customer_name}</Text>
            <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#272938', }}>#{item.customer_account_no}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#7985AF', }}>{item.customer_meter}</Text>
            {item.sn_no ?
              <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#7985AF', }}>{item.device_type}-SN#{item.sn_no}</Text>
              : null
              }
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#7985AF', }}>{item.time}</Text>
            {/* <View style={{ flexDirection: 'row', }}>
              <Text style={{ fontFamily: 'SFCompactText-Regular', fontSize: 14, fontWeight: '400', color: '#2FB3F0', }}>Open</Text>
              <Image
                source={require('../images/down-arrow-opflex.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20, }}
              />
            </View> */}
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader loading={isLoading} />
      <StatusBar animated={true} backgroundColor="#44546A" />
      <Header title={'History'} showSearchBar={true} />
      {/* <View style={{ marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2), flexDirection: 'row', paddingLeft: 16, paddingRight: 16, alignItems: 'center', }}>
        <View style={styles.backbutton}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack(null)}>
            <Image
              source={require('../images/back.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>History</Text>
      </View> */}
      <View style={styles.lineStyle} />
      <FlatList
        data={flatListItem}
        renderItem={renderList}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={true}
        maxToRenderPerBatch={60}
      />

    </SafeAreaView>
  )
}

export default History;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  headerText: {
    fontFamily: 'SFCompactText-Regular',
    fontWeight: '400',
    color: '#272B38',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '400'
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#F4F7FF',
  },
})


