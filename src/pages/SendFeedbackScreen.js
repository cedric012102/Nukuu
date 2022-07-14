
import React from 'react';
import {View, Text, Linking, Button} from 'react-native';
import FormButton from '../components/FormButton';

const SendFeedbackScreen = () => {
  return (
    <View>
      <Text style={{marginTop: 20, padding: 10}}>
        Thank you for using our app, we would like to hear your feedback.
      </Text>
      <Text style={{marginTop: 20, padding: 10}}>
        Send your feedback to quelevate@gmail.com
      </Text>
      <FormButton
        onPress={() =>
          Linking.openURL(
            'mailto:quelevate@gmail.com?subject=SendMail&body=Description',
          )
        }
        buttonTitle="Send Email"
      />
    </View>
  );
};

export default SendFeedbackScreen;