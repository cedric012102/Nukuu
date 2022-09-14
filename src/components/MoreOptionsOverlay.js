import ActionSheet from '@alessiocancian/react-native-actionsheet';
import React, {useRef, useContext} from 'react';
import {Linking, Platform, Text, TouchableOpacity, Alert} from 'react-native';
import {AwesomeModal} from 'react-native-awesome-modal';
import {Navigation} from 'react-native-navigation';
import {styles} from './styles/MoreOptionsOverlayStyle';
import {ServiceButton} from './ServiceButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

export function MoreOptionsOverlay({componentId}) {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const isActionSheetOpen = useRef(false);
  const awesomeModalRef = useRef(null);
  const {user, logout} = useContext(AuthContext);

  const logoutAlert = () =>
  Alert.alert('Logout!', 'Are You Sure You Want To Logout?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Logout', onPress: () => logout()},
  ]);

  const deleteAccountAlert = () =>
    Alert.alert(
      'Delete Account',
      'Are You Sure You Want To Delete Your Account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => deleteUser()},
      ],
    );

  function deleteUser() {
    // console.log('Current Post Id: ', user);

    Firestore()
      .collection('users')
      .doc(Auth().currentUser.uid)

      .delete()
      .then(() => {
        console.log('User deleted!');
      })
      .catch(e => {
        console.log('Error while deleting the user. ', e);
      });
    logout();
  }

  return (
    <AwesomeModal
      ref={awesomeModalRef}
      // onClose={onClose}
      onPressOutside={() => console.log('outside')}
      modalBottomMargin={0}
      modalContainerStyle={styles.containerStyle}
      modalOverlayStyle={styles.ModalOverlayStyle}
      modalInnerContainerStyle={styles.modalInnerContainerStyle}
    >
      <ServiceButton
        image={require('../assets/images/Journey.jpeg')}
        label="Feedback/Privacy"
        onPress={() => navigation.navigate('Feedback/Privacy')}
      />
      <ServiceButton
        image={require('../assets/images/Journey.jpeg')}
        label="Logout"
        onPress={logoutAlert}
      />
      <ServiceButton
        image={require('../assets/images/Journey.jpeg')}
        label="Delete Account"
        onPress={deleteAccountAlert}
      />

      <ActionSheet
        ref={actionSheetRef}
        title={'Please Contact Josie Emch for Further Booking'}
        options={['cancel']}
        cancelButtonIndex={1}
        onPress={onSelectOption}
      />
    </AwesomeModal>
  );

  function onSelectOption(index) {
    Navigation.dismissOverlay(componentId);
    isActionSheetOpen.current = false;

    if (index === 0) {
      if (Platform.OS === 'android') {
        Linking.openURL('https://www.footlocker.com');
      } else {
        Linking.openURL('https://www.footlocker.com');
      }
    }
  }
}