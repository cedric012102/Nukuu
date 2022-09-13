import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {ListItem, Icon} from 'react-native-elements';

const FeedbackPrivacy = ({navigation}) => {
  const sendFeedbackoute = () => {
    navigation.navigate('Send Feedback');
  };

  const termsOfUseRoute = () => {
    Linking.openURL('https://cedric012102.wixsite.com/nukuu/terms');
  };

  const privacyStatementRoute = () => {
    Linking.openURL('https://cedric012102.wixsite.com/nukuu/privacy-policy');
  };

  const list = [
    {
      title: 'Send Feedback',
      //   icon: 'av-timer',
      route: sendFeedbackoute,
    },
    {
      title: 'Terms of Use',
      //   icon: 'flight-takeoff'
      route: termsOfUseRoute,
    },
    {
      title: 'Privacy Statement',
      // icon: 'flight-takeoff'
      route: privacyStatementRoute,
    },
  ];

  return (
    <View>
      {list.map((item, i) => (
        <ListItem key={i} bottomDivider>
          <Icon name={item.icon} />
          <ListItem.Content>
            <TouchableOpacity onPress={item.route}>
              <ListItem.Title>{item.title}</ListItem.Title>
            </TouchableOpacity>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
};

export default FeedbackPrivacy;