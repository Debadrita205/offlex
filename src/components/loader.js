import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';

const Loader = props => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color="#2FB3F0" size="large" />
          <Text style={{color:'#272B38'}}>Please Wait... !</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 110,
    borderRadius: 10,
    display: 'flex',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
