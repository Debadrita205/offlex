import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const BackHeader = (props) => {
    const { title } = props;
    const navigation = useNavigation();
    return (
        <View style={styles.wrapper}>
        <Icon
            name="arrow-left"
            style={{ padding: 20 }}
            size={25}
            color={'#fff'}
            onPress={() => { navigation.goBack() }}
          />
        <Text
          style={styles.headerTitleStyle}>
          {title}
        </Text>
        </View>
    )
}

export default BackHeader;

const styles = StyleSheet.create({
  wrapper: {
      backgroundColor: '#000099',
      flexDirection:'row'
    },
    headerTitleStyle:{
      color: '#fff',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
    }
  });