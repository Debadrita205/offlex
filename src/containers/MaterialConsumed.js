import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Dimensions,
    BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loader from '../components/loader';
import {StatusBar} from 'react-native';
import {Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialInput from '../components/MaterialInput';

const MaterialConsumed = ({navigation, route}) => {
    const [isLoading, setisLoading] = useState(false);
    const [material1, setMaterial1] = useState('0');
    const [material2, setMaterial2] = useState('0');
    const [material3, setMaterial3] = useState('0');
    const [material4, setMaterial4] = useState('0');
    const [material5, setMaterial5] = useState('0');
    const [material6, setMaterial6] = useState('0');
    const [material7, setMaterial7] = useState('0');
    const [material8, setMaterial8] = useState('0');
    const [material9, setMaterial9] = useState('0');
    const [material10, setMaterial10] = useState('0');
    const [material11, setMaterial11] = useState('0');
    const [material12, setMaterial12] = useState('0');
    const [material13, setMaterial13] = useState('0');
    const [material14, setMaterial14] = useState('0');
    const [material15, setMaterial15] = useState('0');
    const [material16, setMaterial16] = useState('0');
    const [material17, setMaterial17] = useState('0');
    const [material18, setMaterial18] = useState('0');
    const [material19, setMaterial19] = useState('0');
    const [material20, setMaterial20] = useState('0');
    const [material21, setMaterial21] = useState('0');

    const serviceId = route.params?.serviceId;

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            //     {
            //         text: 'Cancel',
            //         onPress: () => null,
            //         style: 'cancel',
            //     },
            //     {text: 'YES', onPress: () => BackHandler.exitApp()},
            // ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const formSubmit = () => {
        if (
            material1 === '' ||
            material2 === '' ||
            material3 === '' ||
            material4 === '' ||
            material5 === '' ||
            material6 === '' ||
            material7 === '' ||
            material8 === '' ||
            material9 === '' ||
            material10 === '' ||
            material11 === '' ||
            material12 === '' ||
            material13 === '' ||
            material14 === '' ||
            material15 === '' ||
            material16 === '' ||
            material17 === '' ||
            material18 === '' ||
            material19 === '' ||
            material20 === '' ||
            material21 === ''
        ) {
            Alert.alert('OOPS!', 'Please enter all the materials', [
                {
                    text: 'Okay',
                },
            ]);
        } else if (
            isNaN(material1) ||
            isNaN(material2) ||
            isNaN(material3) ||
            isNaN(material4) ||
            isNaN(material5) ||
            isNaN(material6) ||
            isNaN(material7) ||
            isNaN(material8) ||
            isNaN(material9) ||
            isNaN(material10) ||
            isNaN(material11) ||
            isNaN(material12) ||
            isNaN(material13) ||
            isNaN(material14) ||
            isNaN(material15) ||
            isNaN(material16) ||
            isNaN(material17) ||
            isNaN(material18) ||
            isNaN(material19) ||
            isNaN(material20) ||
            isNaN(material21)
        ) {
            Alert.alert(
                'OOPS!',
                'Please make sure all the inputs are in digits (0-9).',
                [
                    {
                        text: 'Okay',
                    },
                ],
            );
        } else {
            AsyncStorage.getItem('user_token', (err, restoken) => {
                setisLoading(true);
                const userToken = JSON.parse(restoken);
                let apiReqBody = JSON.stringify({
                    service: serviceId.toString(),
                    material_1: material1,
                    material_2: material2,
                    material_3: material3,
                    material_4: material4,
                    material_5: material5,
                    material_6: material6,
                    material_7: material7,
                    material_8: material8,
                    material_9: material9,
                    material_10: material10,
                    material_11: material11,
                    material_12: material12,
                    material_13: material13,
                    material_14: material14,
                    material_15: material15,
                    material_16: material16,
                    material_17: material17,
                    material_18: material18,
                    material_19: material19,
                    material_20: material20,
                    material_21: material21,
                });
                fetch(
                    // 'https://opflex.nurighana.com/api/service_materials_add',
                    'https://opflextest.nurighana.com/api/service_materials_add',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `${userToken}`,
                        },
                        body: apiReqBody,
                    },
                )
                    .then(res => res.json())
                    .then(resource => {
                        console.log(resource);
                        if (resource.status == 'failed') {
                            setisLoading(false);
                            return Alert.alert(
                                'OOPS!',
                                'Something went wrong, please try again later.',
                                [{text: 'Okay'}],
                            );
                        } else if (resource.status == 'success') {
                            setisLoading(false);
                            navigation.navigate('Home');
                            return Alert.alert('YES!', 'Service Generated.', [
                                {text: 'Okay'},
                            ]);
                        } else if (resource.status == 'fail') {
                            setisLoading(false);
                            return Alert.alert(
                                'OOPS!',
                                'Something went wrong, please try again later.',
                                [{text: 'Okay'}],
                            );
                        }
                    });
            });
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAvoidingView
                behavior={'height'}
                keyboardVerticalOffset={-30}
            >
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
                    <Text style={styles.headerText}>Material Consumed</Text>
                </View>
                <View style={styles.lineStyle} />
                <ScrollView
                    style={{
                        marginBottom: responsiveHeight(10),
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{alignSelf: 'center'}}
                >
                    <MaterialInput
                        label={'Enclosures (unit)'}
                        value={material1}
                        onChangeText={text => setMaterial1(text)}
                    />
                    <MaterialInput
                        label={'Coachscrew Insulator (unit)'}
                        value={material2}
                        onChangeText={text => setMaterial2(text)}
                    />
                    <MaterialInput
                        label={'2-core PVC Al Cable (m)'}
                        value={material3}
                        onChangeText={text => setMaterial3(text)}
                    />
                    <MaterialInput
                        label={'Twin-core PVC Al cable (m)'}
                        value={material4}
                        onChangeText={text => setMaterial4(text)}
                    />
                    <MaterialInput
                        label={'LV Insulation Tape'}
                        value={material5}
                        onChangeText={text => setMaterial5(text.value)}
                        dropdown
                    />
                    <MaterialInput
                        label={'Tower Clips (unit)'}
                        value={material6}
                        onChangeText={text => setMaterial6(text)}
                    />
                    <MaterialInput
                        label={'50sq bare Al Conductor (m)'}
                        value={material7}
                        onChangeText={text => setMaterial7(text)}
                    />
                    <MaterialInput
                        label={'120sq bare Al Conductor (m)'}
                        value={material8}
                        onChangeText={text => setMaterial8(text)}
                    />
                    <MaterialInput
                        label={'9m Wooden Pole (unit)'}
                        value={material9}
                        onChangeText={text => setMaterial9(text)}
                    />
                    <MaterialInput
                        label={'Stay equipment set (unit)'}
                        value={material10}
                        onChangeText={text => setMaterial10(text)}
                    />
                    <MaterialInput
                        label={'Stay wire-7/4 SWG (m)'}
                        value={material11}
                        onChangeText={text => setMaterial11(text)}
                    />
                    <MaterialInput
                        label={'Wooden Stay block (unit)'}
                        value={material12}
                        onChangeText={text => setMaterial12(text)}
                    />
                    <MaterialInput
                        label={'LV Stay Insulator (unit)'}
                        value={material13}
                        onChangeText={text => setMaterial13(text)}
                    />
                    <MaterialInput
                        label={'50/25 bolted Al clamp (unit)'}
                        value={material14}
                        onChangeText={text => setMaterial14(text)}
                    />
                    <MaterialInput
                        label={'120/25 bolted Al clamp (unit)'}
                        value={material15}
                        onChangeText={text => setMaterial15(text)}
                    />
                    <MaterialInput
                        label={'M16-260-bolts and nuts (unit)'}
                        value={material16}
                        onChangeText={text => setMaterial16(text)}
                    />
                    <MaterialInput
                        label={'D - Iron with Pin (unit)'}
                        value={material17}
                        onChangeText={text => setMaterial17(text)}
                    />
                    <MaterialInput
                        label={'LV Shackle Insulator (unit)'}
                        value={material18}
                        onChangeText={text => setMaterial18(text)}
                    />
                    <MaterialInput
                        label={'Soft Al binding Wire (m)'}
                        value={material19}
                        onChangeText={text => setMaterial19(text)}
                    />
                    <MaterialInput
                        label={'Meter seals (m)'}
                        value={material20}
                        onChangeText={text => setMaterial20(text)}
                    />
                    <MaterialInput
                        label={'Signal Strength'}
                        value={material21}
                        onChangeText={text => setMaterial21(text)}
                    />

                    <TouchableOpacity
                        // onPress={() => checkValidMeter()}
                        onPress={formSubmit}
                    >
                        <View style={styles.button_view}>
                            <Button
                                block
                                style={styles.buttonsubmit}
                                // onPress={() => checkValidMeter()}
                                onPress={formSubmit}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontFamily: 'SFCompactText-Regular',
                                        fontSize: 14,
                                        fontWeight: '500',
                                    }}
                                >
                                    VALIDATE
                                </Text>
                            </Button>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MaterialConsumed;

const styles = StyleSheet.create({
    wrapper: {flex: 1},
    headerText: {
        fontFamily: 'SFCompactText-Regular',
        fontWeight: '400',
        color: '#272B38',
        fontSize: 18,
        marginLeft: 10,
    },
    lineStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#F4F7FF',
    },

    buttonsubmit: {
        backgroundColor: '#2FB3F0',
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(7),
        width: responsiveWidth(100),
        borderRadius: 0,
    },
    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
        height: responsiveHeight(6),
        width: '80%',
        borderRadius: 10,
        // marginBottom: 20,
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
        //backgroundColor: '#F4F7FF',
        color: '#424242',
    },
});
