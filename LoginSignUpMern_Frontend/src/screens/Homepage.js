import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {head1} from '../common/formcss';
import {Button} from '@react-native-material/core';

const Homepage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={head1}>This is Homepage</Text>
      <TouchableOpacity>
        <Button
          title=" Logout "
          //style={button1}
          onPress={() => {
            navigation.navigate('login');
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Homepage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
