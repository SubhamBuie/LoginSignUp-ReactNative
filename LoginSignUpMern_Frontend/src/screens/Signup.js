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
  input1,
  errormessage,
} from '../common/formcss';
import {TextInput, Button} from '@react-native-material/core';

const Signup = ({navigation}) => {
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
    cpassword: '',
    address: '',
  });
  const [errormsg, setErrormsg] = useState(null);
  const Sendtobackend = () => {
    // console.log(fdata);
    if (
      fdata.name == '' ||
      fdata.email == '' ||
      fdata.dob == '' ||
      fdata.password == '' ||
      fdata.cpassword == '' ||
      fdata.address == ''
    ) {
      setErrormsg('Please fill all the fields');
    } else {
      if (fdata.password != fdata.cpassword) {
        setErrormsg('Passwords are not matching!');
        return;
      } else {
        fetch('http://10.0.2.2:3000/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
          .then(res => res.json())
          .then(data => {
            if (data.error === 'Invalid Credentials') {
              // alert('Invalid Credentials')
              setErrormsg('Invalid Credentials');
            } else if (
              data.message === 'Verification Code Sent to your Email'
            ) {
              console.log(data.udata);
              alert(data.message);
              navigation.navigate('verification', {userdata: data.udata});
            }
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.container1}>
        <View style={styles.s1}></View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>
            Already Registered?&nbsp;
            <Text style={link} onPress={() => navigation.navigate('login')}>
              Login here
            </Text>
          </Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={label}>Name</Text>
            <TextInput
              placeholder="Enter your Name"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, name: text})}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput
              placeholder="Enter your Email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, email: text})}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>DOB</Text>
            <TextInput
              placeholder="Enter your Date of Birth"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, dob: text})}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput
              placeholder="Enter your Password"
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, password: text})}
            />
          </View>

          <View style={formgroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your Password"
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, cpassword: text})}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Address</Text>
            <TextInput
              placeholder="Enter your Address"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text => setFdata({...fdata, address: text})}
            />
          </View>
          <TouchableOpacity>
            <Button
              style={button1}
              title=" Signup "
              //style={button1}
              onPress={() => {
                Sendtobackend();
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;

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
    height: '5%',
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
    height: '95%',
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
