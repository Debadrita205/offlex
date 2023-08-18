/* eslint-disable handle-callback-err */
import React, {useEffect, useContext, useState} from 'react';
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
    ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../components/context';
import Loader from '../components/loader';
import {
    getProfile,
    getUserCategoryList,
    getEmployeeCategoryList,
} from '../service/auth';
import {setProfile} from '../actions/action';
import {CONSTANT} from '../constants';
import Header from '../components/header';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {ImageSlider} from 'react-native-image-slider-banner';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import {
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
const sliderWidth = Dimensions.get('window').width;

const ServiceDetails = props => {
    const {navigation, route} = props;
    const state = useSelector(state => state);
    const context = useContext(AuthContext);
    const dispatch = useDispatch();

    const [customerid, setcustomerid] = useState('');
    const [customername, setcustomername] = useState('');
    const [customerphone, setcustomerphone] = useState('');
    const [customeraddress, setcustomeraddress] = useState('');
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [deviceType, setdeviceType] = useState([]);

    const [isLoading, setisLoading] = useState(false);
    const [flatListItem, setflatListItem] = useState([]);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('2');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);
    const [meterType, setmeterType] = useState('');
    const [tarifNo, setTariffNo] = useState('');
    const [meterId, setmeterId] = useState('');
    const [imagename, setimagename] = useState('open.jpg');
    const [imageuri, setImageuri] = useState({});
    const [imagecheck, setImagecheck] = useState(false);
    const [imagename2, setimagename2] = useState('open.jpg');
    const [imageuri2, setImageuri2] = useState({});
    const [imagecheck2, setImagecheck2] = useState(false);
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const [locationStatus, setLocationStatus] = useState('');
    const [geolat, setgeolat] = useState(
        currentLatitude + ',' + currentLongitude,
    );
    const [replacedId, setReplacedId] = useState('');
    const [isRequireToCheck, setisRequireToCheck] = useState(false);
    const [validateDone, setValidateDone] = useState(false);
    const [consumption, setConsumption] = useState('');
    const [meterSeal, setMeterSeal] = useState('');
    const [encloserSeal, setEncloserSeal] = useState('');
    const [signalStrength, setSignalStrength] = useState('');

    useEffect(() => {
        //context.signOut();
        //requestLocationPermission();
        requestCameraPermission();
        searchcustomer();
        getService();
        getComment();
        getDeviceType();
    }, []);
    useEffect(() => {
        console.log(props.route.params.mid, 'ffffffffff');
        console.log(props.route.params.number, 'params from homescreen');
        setmeterId(props.route.params.mid);
        if (props.route.params.mid != undefined) {
            checkValidMeter(props.route.params.mid);
        }
    }, [props.route.params.mid]);

    const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted) {
            console.log('You can use the ACCESS_FINE_LOCATION');
        } else {
            console.log('ACCESS_FINE_LOCATION permission denied');
        }
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission given');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getService = () => {
        AsyncStorage.getItem('user_token', (err, restoken) => {
            const userToken = JSON.parse(restoken);
            console.log(userToken);
            // fetch('https://opflex.nurighana.com/api/service_type', {
            fetch('https://opflextest.nurighana.com/api/service_type', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${userToken}`,
                },
            })
                .then(res => res.json())
                .then(resource => {
                    if (resource.status == 'success') {
                        console.log('from getService type api ->', resource);
                        setdata(resource.details);
                    }
                });
        });
    };
    const getComment = () => {
        AsyncStorage.getItem('user_token', (err, restoken) => {
            const userToken = JSON.parse(restoken);
            //console.log(userToken);
            // fetch('https://opflex.nurighana.com/api/service_comment', {
            fetch('https://opflextest.nurighana.com/api/service_comment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${userToken}`,
                },
            })
                .then(res => res.json())
                .then(resource => {
                    if (resource.status == 'success') {
                        console.log('from getComment api ->', resource);
                        setdata2(resource.details);
                    }
                });
        });
    };
    const getDeviceType = () => {
        AsyncStorage.getItem('user_token', (err, restoken) => {
            const userToken = JSON.parse(restoken);
            //console.log(userToken);
            // fetch('https://opflex.nurighana.com/api/device_type_list', {
            fetch('https://opflextest.nurighana.com/api/device_type_list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${userToken}`,
                },
            })
                .then(res => res.json())
                .then(resource => {
                    if (resource.status == 'success') {
                        console.log('from getDeviceType api ->', resource);
                        setdeviceType(resource.details);
                    }
                });
        });
    };

    const searchcustomer = () => {
        setisLoading(true);
        AsyncStorage.getItem('user_token', (err, restoken) => {
            const userToken = JSON.parse(restoken);
            //console.log(userToken);
            // fetch('https://opflex.nurighana.com/api/search_customer', {
            fetch('https://opflextest.nurighana.com/api/search_customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${userToken}`,
                },
                body: JSON.stringify({
                    account_no: props.route.params.number,
                }),
            })
                .then(res => res.json())
                .then(resource => {
                    console.log('from searchcustomer api ->', resource);
                    if (resource.status == 'Success') {
                        setcustomerid(resource.data[0].id);
                        setcustomername(resource.data[0].name);
                        setcustomerphone(resource.data[0].mobile);
                        setcustomeraddress(resource.data[0].address);
                        setmeterType(resource.data[0].meter_type);
                        setTariffNo(resource.data[0].tariff_no);
                        setisLoading(false);
                    }
                });
        });
    };

    const getCurrentLatLong = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                setCurrentLatitude(location.latitude);
                setCurrentLongitude(location.longitude);
                setgeolat(location.latitude + ',' + location.longitude);
            })
            .catch(error => {
                const {code, message} = error;
                console.warn(code, message);
            });
    };

    // function pickProfileImage() {
    //     const options = {
    //         title: '',
    //         maxWidth: 1024,
    //         maxHeight: 1024,
    //         quality: 20,
    //     };
    //     launchImageLibrary(options, response => {
    //         console.log(response)
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.assets[0].uri };
    //             console.log(source)
    //             setImagecheck(true)
    //             setImageuri(source)
    //             setimagename(response.assets[0].fileName)
    //         }
    //     });
    // }

    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            // maxWidth: 300,
            // maxHeight: 550,
            // quality: 1,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
                alert(response.customButton);
            } else {
                const source = {uri: response.assets[0].uri};
                console.log('response', response);
                setImagecheck(true);
                setImageuri(response.assets[0]);
                setimagename(response.assets[0].fileName);
            }
        });
    };

    const launchCamera2 = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            // maxWidth: 300,
            // maxHeight: 550,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
                alert(response.customButton);
            } else {
                const source = {uri: response.assets[0].uri};
                console.log('response', source);
                setImagecheck2(true);
                setImageuri2(response.assets[0]);
                setimagename2(response.assets[0].fileName);
            }
        });
    };

    const byClickFilter = item => {
        console.log(item.value);
        setValue(item.value);
        setIsFocus(false);
        // if (item.value == '4') {
        //  navigation.navigate('Filter')
        // }
    };
    const checkmeterType = str => {
        setmeterType(str);
    };
    const byClickFilter2 = item => {
        console.log(item.value);
        setValue2(item.value);
        setIsFocus2(false);
    };
    const byClickFilter3 = item => {
        console.log(item.value);
        setValue3(item.value);
        setIsFocus3(false);
    };

    const checkValidMeter = meterId => {
        console.log('irtc: ', isRequireToCheck);
        if (isRequireToCheck == false && value3 !== '') {
            setisLoading(true);
            console.log(meterId);
            console.log('type: ', value3);
            AsyncStorage.getItem('user_token', (err, restoken) => {
                const userToken = JSON.parse(restoken);
                // fetch('https://opflex.nurighana.com/api/verify_meter', {
                fetch('https://opflextest.nurighana.com/api/verify_meter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${userToken}`,
                    },
                    body: JSON.stringify({
                        meter: meterId,
                        device_type: value3,
                        // expiresInMins: 60, // optional
                    }),
                })
                    .then(res => res.json())
                    .then(resource => {
                        console.log(resource);
                        if (resource.status == 'failed') {
                            setisLoading(false);

                            setmeterId('');
                            return Alert.alert('OOPS!', 'Device is not found', [
                                {text: 'Okay'},
                            ]);
                        } else if (resource.status == 'success') {
                            setisLoading(false);
                            setValidateDone(true);
                            // navigation.navigate('MaterialConsumed');
                            return Alert.alert(
                                'YES!',
                                'Verification successfull',
                                [{text: 'Okay'}],
                            );
                        } else if (resource.status == 'fail') {
                            setisLoading(false);
                            setmeterId('');
                            return Alert.alert('OOPS!', 'Device is not found', [
                                {text: 'Okay'},
                            ]);
                        }
                    });
            });
        } else if (value3 === '') {
            Alert.alert('OOPS!', 'Please select Device Type', [{text: 'Okay'}]);
        }
    };

    const formsubmit = () => {
        // if (validateDone) {
        //alert(meterId)
        setisRequireToCheck(true);
        setisLoading(true);
        if (value == '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please choose service', [
                {text: 'Okay'},
            ]);
        } else if (value === 3 && replacedId === '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please fill Replaced Meter ID.', [
                {text: 'Okay'},
            ]);
        } else if (value === 3 && consumption === '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please fill Consumption.', [
                {text: 'Okay'},
            ]);
        } else if (currentLatitude == '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please choose current location', [
                {text: 'Okay'},
            ]);
        } else if (currentLongitude == '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please choose current location', [
                {text: 'Okay'},
            ]);
        } else if (Object.keys(imageuri).length === 0) {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert(
                'OOPS!',
                'Please upload an image in the first Camera field.',
                [{text: 'Okay'}],
            );
        } else if (Object.keys(imageuri2).length === 0) {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert(
                'OOPS!',
                'Please upload an image in the second Camera field.',
                [{text: 'Okay'}],
            );
        } else if (meterId == '' || meterId == undefined) {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please enter Meter id or scan', [
                {text: 'Okay'},
            ]);
        } else if (value3 == '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please select Device Type', [
                {text: 'Okay'},
            ]);
        } else if (meterSeal === '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please enter Meter Seal Number', [
                {text: 'Okay'},
            ]);
        } else if (encloserSeal === '') {
            setisLoading(false);
            setisRequireToCheck(false);
            return Alert.alert('OOPS!', 'Please enter Enclosure Seal Number', [
                {text: 'Okay'},
            ]);
        } else {
            AsyncStorage.getItem('user_token', (err, restoken) => {
                const userToken = JSON.parse(restoken);
                let body = new FormData();
                // console.log(imageuri, '1st image pathhhhh');
                // console.log(imageuri2, '2nd image pathhhhh');
                // let photo = {
                //     name: imageuri?.path.split('/')[
                //         imageuri?.path.split('/').length - 1
                //     ],
                //     uri: imageuri?.path,
                //     type: imageuri?.mime,
                // };
                // let photo2 = {
                //     name: imageuri2?.path.split('/')[
                //         imageuri2?.path.split('/').length - 1
                //     ],
                //     uri: imageuri2?.path,
                //     type: imageuri2?.mime,
                // };
                var photo = {
                    uri: imageuri?.uri,
                    type: imageuri?.type,
                    name: imageuri?.fileName,
                };
                var photo2 = {
                    uri: imageuri2?.uri,
                    type: imageuri2?.type,
                    name: imageuri2?.fileName,
                };
                body.append('image', photo);
                body.append('file', photo2);
                //body.append('Content-Type', 'image/png');
                //body.append('image', imageuri);
                body.append('customer', customerid);
                body.append('service_comment', value2);
                body.append('device_sn_no', meterId);
                body.append('geo_lat', currentLatitude);
                body.append('geo_lan', currentLongitude);
                body.append('service_type', value);
                body.append('device_type', value3);
                if (value === 3) {
                    body.append('replaced_meter', replacedId);
                    body.append('consumption', consumption);
                }
                body.append('meter_seal_number', meterSeal);
                body.append('enclosure_seal_number', encloserSeal);
                body.append('signal_strength', signalStrength);
                // fetch('https://opflex.nurighana.com/api/service_add', {
                fetch('https://opflextest.nurighana.com/api/service_add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${userToken}`,
                    },
                    body: body,
                })
                    .then(res => res.json())
                    .then(async resource => {
                        if (resource.status == 'Success') {
                            setValidateDone(false);
                            setisLoading(false);
                            setisRequireToCheck(true);
                            Alert.alert('YES!', 'Verification Successful!!!!');
                            console.log('hit success');
                            if (resource?.service != null) {
                                navigation.replace('MaterialConsumed', {
                                    serviceId: resource?.service?.id,
                                });
                            }
                        } else if (resource.status == 'fail') {
                            setisLoading(false);
                            setisRequireToCheck(false);
                            if (resource.details != null) {
                                return Alert.alert('OOPS!', resource.details, [
                                    {text: 'Okay'},
                                ]);
                            } else {
                                return Alert.alert(
                                    'OOPS!',
                                    'Device is not found',
                                    [{text: 'Okay'}],
                                );
                            }
                        } else {
                            setisLoading(false);
                            setisRequireToCheck(false);
                            return Alert.alert(
                                'OOPS!',
                                'Something went wrong',
                                [{text: 'Okay'}],
                            );
                        }
                    })
                    .catch(e => {
                        setisLoading(false);
                        console.log(e);
                        return Alert.alert('OOPS!', 'Network request faild', [
                            {text: 'Okay'},
                        ]);
                    });
            });
        }
        // } else {
        // checkValidMeter(meterId);
        // }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <Loader loading={isLoading} />
            <StatusBar animated={true} backgroundColor="#44546A" />
            <View
                style={{
                    marginTop: responsiveHeight(2),
                    marginBottom: responsiveHeight(2),
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                    alignItems: 'center',
                }}
            >
                <View style={styles.backbutton}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => navigation.goBack(null)}
                    >
                        <Image
                            source={require('../images/back.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20}}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Service</Text>
            </View>
            <View style={styles.lineStyle} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: responsiveHeight(6)}}
            >
                <View style={{height: responsiveHeight(14), padding: 10}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#272938',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 18,
                                fontWeight: '400',
                            }}
                        >
                            {customername}
                        </Text>
                        <Text
                            style={{
                                color: '#2FB3F0',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            #{props.route.params.number}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={require('../images/telephone-opflex.png')}
                            resizeMode="contain"
                            style={{width: 18, height: 18, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            {customerphone}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={require('../images/pin-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            {customeraddress}
                        </Text>
                    </View>
                </View>
                <View style={styles.lineStyle} />
                <View style={{padding: 10}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <Image
                                source={require('../images/electric-meter-opflex.png')}
                                resizeMode="contain"
                                style={{width: 20, height: 20, marginRight: 10}}
                            />
                            <Text
                                style={{
                                    color: '#272B38',
                                    fontFamily: 'SFCompactText-Regular',
                                    fontSize: 13,
                                    fontWeight: '400',
                                }}
                            >
                                Meter ID
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                                textAlign: 'right',
                            }}
                        >
                            {meterType}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <Image
                                source={require('../images/electric-meter-opflex.png')}
                                resizeMode="contain"
                                style={{width: 20, height: 20, marginRight: 10}}
                            />
                            <Text
                                style={{
                                    color: '#272B38',
                                    fontFamily: 'SFCompactText-Regular',
                                    fontSize: 13,
                                    fontWeight: '400',
                                }}
                            >
                                Tariff Type
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                                textAlign: 'right',
                            }}
                        >
                            {tarifNo}
                        </Text>
                    </View>
                    <View style={styles.lineStyle} />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={require('../images/settings-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Service
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.searchSection}>
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    isFocus && {borderColor: '#D8DFE8'},
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{color: '#3D4255'}}
                                data={data}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select' : '...'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    byClickFilter(item);
                                }}
                            />
                        </View>
                    </View>

                    {value === 3 && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <View style={{width: '55%'}}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#272B38',
                                            fontFamily: 'SFCompactText-Regular',
                                            fontSize: 13,
                                            fontWeight: '400',
                                        }}
                                    >
                                        Replaced Meter ID
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                    }}
                                >
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder=""
                                            placeholderTextColor="#7C7C7C"
                                            value={replacedId}
                                            onChangeText={text => {
                                                setReplacedId(text);
                                            }}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{width: '42%'}}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#272B38',
                                            fontFamily: 'SFCompactText-Regular',
                                            fontSize: 13,
                                            fontWeight: '400',
                                        }}
                                    >
                                        Consumption(kWh)
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                    }}
                                >
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder=""
                                            placeholderTextColor="#7C7C7C"
                                            value={consumption}
                                            onChangeText={text => {
                                                setConsumption(text);
                                            }}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/pin-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Location
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.searchSection}>
                            <TextInput
                                style={styles.input}
                                placeholder="Location"
                                placeholderTextColor="#7C7C7C"
                                value={currentLatitude != '' ? geolat : ''}
                                onChangeText={geolat => {
                                    setgeolat(geolat);
                                }}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                editable={false}
                            />
                            <TouchableOpacity
                                onPress={() => getCurrentLatLong()}
                            >
                                <Image
                                    source={require('../images/gps-opflex.png')}
                                    resizeMode="contain"
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/camera-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Select Image from gallery
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.cameraSection}>
                            <View style={{width: responsiveWidth(50)}}>
                                <Text
                                    style={{
                                        color: '#272B38',
                                        fontFamily: 'SFCompactText-Regular',
                                        fontSize: 13,
                                        fontWeight: '400',
                                    }}
                                    numberOfLines={1}
                                >
                                    {imagename}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    launchCamera();
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#2FB3F0',
                                        fontFamily: 'SFCompactText-Regular',
                                        fontSize: 13,
                                        fontWeight: '400',
                                    }}
                                >
                                    Click Image 1
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/camera-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Select Image from gallery
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.cameraSection}>
                            <View style={{width: responsiveWidth(50)}}>
                                <Text
                                    style={{
                                        color: '#272B38',
                                        fontFamily: 'SFCompactText-Regular',
                                        fontSize: 13,
                                        fontWeight: '400',
                                    }}
                                    numberOfLines={1}
                                >
                                    {imagename2}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    launchCamera2();
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#2FB3F0',
                                        fontFamily: 'SFCompactText-Regular',
                                        fontSize: 13,
                                        fontWeight: '400',
                                    }}
                                >
                                    Click Image 2
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* modified */}
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/settings-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Device Type
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.searchSection}>
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    isFocus && {borderColor: '#D8DFE8'},
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{color: '#3D4255'}}
                                data={deviceType}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus3 ? 'Select' : '...'}
                                value={value3}
                                onFocus={() => setIsFocus3(true)}
                                onBlur={() => setIsFocus3(false)}
                                onChange={item => {
                                    byClickFilter3(item);
                                }}
                            />
                        </View>
                    </View> */}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/power-meter-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Meter ID
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={styles.scanSection}>
                            <TextInput
                                style={styles.input}
                                placeholder="4543543543"
                                placeholderTextColor="#7C7C7C"
                                value={meterId}
                                onChangeText={meterId => {
                                    setmeterId(meterId);
                                }}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                // onBlur={() => checkValidMeter(meterId)}
                            />
                        </View>
                        <View style={styles.scanSection2}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ScanScreen')
                                }
                            >
                                <Image
                                    source={require('../images/scanner-opflex.png')}
                                    resizeMode="contain"
                                    style={{width: 20, height: 20}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* modify end */}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/settings-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Comment (optional)
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.searchSection}>
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    isFocus && {borderColor: '#D8DFE8'},
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{color: '#3D4255'}}
                                data={data2}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus2 ? 'Select' : '...'}
                                value={value2}
                                onFocus={() => setIsFocus2(true)}
                                onBlur={() => setIsFocus2(false)}
                                onChange={item => {
                                    byClickFilter2(item);
                                }}
                            />
                        </View>
                    </View>

                    {/* Add two new fields */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/power-meter-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Meter Seal Number
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={[styles.scanSection, {width: '100%'}]}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#7C7C7C"
                                value={meterSeal}
                                onChangeText={meterId => {
                                    setMeterSeal(meterId);
                                }}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/power-meter-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Enclosure Seal Number
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={[styles.scanSection, {width: '100%'}]}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#7C7C7C"
                                value={encloserSeal}
                                onChangeText={meterId => {
                                    setEncloserSeal(meterId);
                                }}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Image
                            source={require('../images/power-meter-opflex.png')}
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{
                                color: '#272B38',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 13,
                                fontWeight: '400',
                            }}
                        >
                            Signal Strength
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={[styles.scanSection, {width: '100%'}]}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#7C7C7C"
                                value={signalStrength}
                                onChangeText={meterId => {
                                    setSignalStrength(meterId);
                                }}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => checkValidMeter()}
                // onPress={() => {
                //     navigation.navigate('MaterialConsumed');
                // }}
            >
                <View style={styles.button_view}>
                    <Button
                        block
                        style={styles.buttonsubmit}
                        // onPress={() => checkValidMeter()}
                        onPress={() => {
                            // navigation.navigate('MaterialConsumed');
                            formsubmit();
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'SFCompactText-Regular',
                                fontSize: 14,
                                fontWeight: '500',
                            }}
                        >
                            VERIFY
                            {/* {validateDone ? 'VALIDATE' : 'VERIFY'} */}
                        </Text>
                    </Button>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ServiceDetails;

const styles = StyleSheet.create({
    wrapper: {flex: 1},

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
        width: responsiveWidth(90),
        borderRadius: 5,
        paddingHorizontal: 8,
        marginLeft: responsiveWidth(0),
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
        color: '#3D4255',
    },

    iconStyle: {
        width: 30,
        height: 30,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#3D4255',
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
    headerText: {
        fontFamily: 'SFCompactText-Regular',
        fontWeight: '400',
        color: '#272B38',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '400',
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
    scanSection: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
        height: responsiveHeight(6),
        width: responsiveWidth(82),
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#DFE3EF',
        borderWidth: 1,
        paddingHorizontal: 5,
    },
    scanSection2: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
        height: responsiveHeight(6),
        width: responsiveWidth(10),
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#DFE3EF',
        borderWidth: 1,
        paddingHorizontal: 5,
    },
    cameraSection: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
        height: responsiveHeight(6),
        //width: responsiveWidth(90),
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#DFE3EF',
        borderWidth: 1,
        paddingHorizontal: 10,
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
        borderRadius: 0,
    },
    replaceMeterSection: {
        // flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        //backgroundColor: '#F4F7FF',
        color: '#424242',
        width: 60,
    },
});
