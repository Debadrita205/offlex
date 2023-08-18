import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';

const MaterialInput = ({value, onChangeText, label, dropdown}) => {
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        {
            id: 1,
            label: 'Yes',
            value: '1',
        },
        {
            id: 2,
            label: 'No',
            value: '0',
        },
    ];

    const byClickFilter = item => {
        onChangeText(item);
    };

    return (
        <View
            style={{
                // height: responsiveHeight(10),
                alignItems: 'center',
                width: 400,
                justifyContent: 'center',
                marginVertical: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        color: '#272B38',
                        fontFamily: 'SFCompactText-Regular',
                        fontSize: 13,
                        fontWeight: '400',
                        // paddingLeft: 10,
                        width: '35%',
                    }}
                >
                    {label}
                </Text>
                <View style={styles.searchSection}>
                    {!dropdown ? (
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor="#7C7C7C"
                            value={value}
                            onChangeText={text => onChangeText(text)}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            keyboardType="number-pad"
                        />
                    ) : (
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
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchSection: {
        //flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F4F7FF',
        height: responsiveHeight(6),
        width: '55%',
        borderRadius: 10,
        // marginBottom: 20,
        borderColor: '#DFE3EF',
        borderWidth: 1,
        // paddingHorizontal: 5,
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
    dropdown: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 8,
        marginLeft: responsiveWidth(0),
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#3D4255',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#3D4255',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default MaterialInput;
