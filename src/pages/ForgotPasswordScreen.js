import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import FormButton from '../components/FormButton';
import styles from './styles/ForgotPasswordScreenStyle';
import Auth, {firebase} from '@react-native-firebase/auth';

// import {AuthContext} from '../navigation/AuthProvider';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  // const {reset} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.mainText}>
        Enter email and click submit for password reset.
      </Text>
      <TextInput
        style={styles.input}
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholder="Enter Email Address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton buttonTitle="Submit" onPress={forgetPassword} />
    </SafeAreaView>
  );

  function forgetPassword() {
    try {
      firebase.auth().sendPasswordResetEmail(email);
      navigation.navigate('Login');
      Alert.alert('Your password has been reset. Please check your email');
    } catch (e) {
      console.log(alert);
    }
  }

};

export default ForgotPasswordScreen;