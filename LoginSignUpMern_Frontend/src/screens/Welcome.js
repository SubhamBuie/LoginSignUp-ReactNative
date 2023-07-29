import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import pattern from '../../assets/pattern.png';
import {button1} from '../common/Button';
import {Button} from '@react-native-material/core';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />
      {/* <Text style={styles.head}>Hii</Text> */}
      <View style={styles.container1}>
        <TouchableOpacity>
          <Button
            title=" Login "
            style={button1}
            onPress={() => navigation.navigate('login')}
          />
          <Button
            title=" Signup"
            style={button1}
            onPress={() => navigation.navigate('signup')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
