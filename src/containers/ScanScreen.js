import React, { useEffect, useContext, useState } from 'react';

import { View, Dimensions, Text, StyleSheet, Image,SafeAreaView } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import * as Animatable from "react-native-animatable";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Button } from 'react-native-paper';
import { QRreader } from "react-native-qr-decode-image-camera";
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

const ScanScreen = ({ navigation }) => {

  const [torchon, setTorchon] = useState('');
  const [reader, setreader] = useState({
    message: null,
    data: null
  })

  const toggleTorch = () => {
    let tstate = torchon;
    console.log(tstate)
    if (tstate == RNCamera.Constants.FlashMode.off) {
      tstate = RNCamera.Constants.FlashMode.torch;
    } else {
      tstate = RNCamera.Constants.FlashMode.off;
    }
    setTorchon(tstate)
  }
  const onSuccess = (e) => {
    alert(e.data);
    navigation.navigate('ServiceDetails',{mid:e.data})
  }

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  const scanViaFile = () => {
    const options = {
      title: '',
      maxWidth: 480,
      maxHeight: 480,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      console.log(response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(source)
       
        QRreader(response.assets[0].uri)
          .then(data => {
            console.log(data)
            setreader({
              message: "message",
              data: data
            });
            setTimeout(() => {
              setreader({
                message: null,
                data: null
              });
            }, 10000);
          })
          .catch(err => {
            setreader({
              message:  "message",
              data: null
            });
          });
      }
    });

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <TouchableOpacity onPress={()=>navigation.goBack(null)} >
      <View style={{zIndex: 20,margin: 20, width: 30, height: 30, position: 'absolute', right: 0,top:0  }}>
      <Image
        source={require('../images/close-round-2.png')}
        resizeMode='contain'
        style={{ zIndex: 20, margin: 20, width: 30, height: 30, position: 'absolute', right: 0 }}
      />
      </View>
      </TouchableOpacity> */}
      <QRCodeScanner
        showMarker
        onRead={onSuccess.bind(this)}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        flashMode={torchon}
        customMarker={
          <View style={styles.rectangleContainer}>

            <View style={styles.topOverlay}>
              {/* <Text style={{ fontSize: 30, color: "white" }}>
                QR CODE SCANNER
              </Text> */}
              
                <View style={{ zIndex: 20, margin: 20, width: 30, height: 30, position: 'absolute', right: 0, top: 0 }}>
                <TouchableOpacity style={{}} onPress={() => navigation.goBack(null)} >
                  <Image
                    source={require('../images/close-round-2.png')}
                    resizeMode='contain'
                    style={{ zIndex: 20, width: 30, height: 30, }}
                  />
                  </TouchableOpacity>
                </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'rgba(134, 134, 134, 0.5)', height: responsiveHeight(7), width: responsiveWidth(30), borderRadius: 40 }}>
                {/* <TouchableOpacity onPress={() => scanViaFile()}>
                  <Image
                    source={require('../images/galary.png')}
                    resizeMode='contain'
                    // size={SCREEN_WIDTH * 0.73}
                    style={{ height: 22, width: 22 }}
                  />
                </TouchableOpacity> */}
                {/* <Image
                  source={require('../images/line.png')}
                  resizeMode='contain'
                  // size={SCREEN_WIDTH * 0.73}
                  style={{ height: 25, width: 25 }}
                /> */}
                <TouchableOpacity onPress={() => toggleTorch()}>
                  <Image
                    source={require('../images/flash.png')}
                    resizeMode='contain'
                    // size={SCREEN_WIDTH * 0.73}
                    style={{ height: 22, width: 22 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                {/* <Icon
                  name="ios-qr-scanner"
                  size={SCREEN_WIDTH * 0.73}
                  color={iconScanColor}
                /> */}
                <Image
                  source={require('../images/scan-icon.png')}
                  resizeMode='contain'
                  size={SCREEN_WIDTH * 0.73}
                  //size = {40}
                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} >
              <Text style={{fontWeight:'400', fontSize: 14, fontFamily: 'SFCompactText-Regular', color: "#EDF4FE" }}>
                Align The QR Code  Within The
                Frame to Scan
              </Text>
            </View>
          </View>
        }
      />
     
    </SafeAreaView>
  );
};

export default ScanScreen;


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#2FB3F0";

const iconScanColor = "blue";
const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    //borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  button_view: {
    marginTop: responsiveHeight(5),
    alignItems: 'center',
  },
  buttonsubmit: {
    backgroundColor: '#2FB3F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(90),
    borderRadius: 20
  },
});
