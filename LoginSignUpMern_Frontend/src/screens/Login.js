import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import pattern from '../../assets/pattern.png';
import {button1} from '../common/Button';
import {
  head1,
  head2,
  formgroup,
  label,
  input,
  link,
  link2,
  errormessage,
} from '../common/formcss';
import {TextInput, Button} from '@react-native-material/core';

const Login = ({navigation}) => {
  const [fdata, setFdata] = useState({
    email: '',
    password: '',
  });
  const [errormsg, setErrormsg] = useState(null);
  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.email == '' || fdata.password == '') {
      setErrormsg('All fields are required');
      return;
    } else {
      fetch('http://10.0.2.2:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            setErrormsg(data.error);
          } else {
            alert('Logged in Successfully');
            navigation.navigate('homepage');
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.container1}>
        <View style={styles.s1}>
          {/* <Image style={styles.logo} source={logo} /> */}
          <Text
            style={styles.h1}
            onPress={() => navigation.navigate('welcome')}>
            Welcome To
          </Text>
          <Text style={styles.small1}>IWCN</Text>
        </View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}

          <View>
            <Text style={label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, email: text})}
            />
          </View>
          <View>
            <Text style={label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, password: text})}
            />
          </View>
          <View style={styles.fp}>
            <Text style={link}>Forgot Password?</Text>
          </View>
          <TouchableOpacity>
            <Button title=" Login " onPress={() => Sendtobackend()} />
          </TouchableOpacity>

          <Text style={link2}>
            Don't have an account?&nbsp;
            <Text style={link} onPress={() => navigation.navigate('signup')}>
              Create a new account
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

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
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  small1: {
    color: '#00ffff',
    fontSize: 30,
  },
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formgroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFB0CC',
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 80,
    resizeMode: 'contain',
  },
});
