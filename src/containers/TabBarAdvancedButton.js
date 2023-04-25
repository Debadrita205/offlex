import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import TabBg from './TabBg';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {CONSTANT} from '../constants';

const TabBarAdvancedButton = props => {
  const state = useSelector(state => state);
  const {bgColor, onPress} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      pointerEvents="box-none"
      onPress={onPress}>
      <TabBg color={bgColor} style={styles.background} />
      <LinearGradient
        style={styles.button}
        onPress={onPress}
        colors={['#01009a', '#01b0f3']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {state.role === CONSTANT.ROLE.JOBSEEKER ? (
          <Image
            style={{width: 32, height: 32}}
            source={require('../images/search.png')}
            resizeMode="cover"
          />
        ) : (
          <Image
            style={{width: 32, height: 32}}
            source={require('../images/plus.png')}
            resizeMode="cover"
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TabBarAdvancedButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  button: {
    bottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    borderRadius: 48,
    backgroundColor: 'blue',
    borderColor: '#FFFFFF00',
    borderWidth: 12,
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F6F7EB',
  },
});
