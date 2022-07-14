import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  StyleSheet,
  Alert,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);

const QuoteScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const [Quote, setQuote] = useState('Loading...');
  const [Author, setAuthor] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(result => {
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const speakNow = () => {
    Tts.stop();
    Tts.speak(Quote + ' by ' + Author);
    Tts.addEventListener('tts-start', event => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', event => setIsSpeaking(false));
  };

  const copyToClipboard = () => {
    Clipboard.setString(Quote);
    Snackbar.show({
      text: 'Quote copied!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const tweetNow = () => {
    const url = 'https://twitter.com/intent/tweet?text=' + Quote;
    Linking.openURL(url);
  };

  return (
    <LinearGradient
      colors={['#255C99', '#F4B393', '#7EA3CC']}
      style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5372F0',
        }}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#255C99', '#F4B393', '#7EA3CC']}
          style={styles.container}>
          <View
            style={{
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 20,
            }}>

              <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={onFavoriteAdd}
                style={{
                  borderWidth: 2,
                  borderColor: '#5372F0',
                  borderRadius: 50,
                  padding: 15,
                }}>
                <FontAwesome name="heart" size={22} color="#5372F0" />
              </TouchableOpacity>
              </View>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 26,
                fontWeight: '600',
                color: '#333',
                marginBottom: 20,
              }}>
              Quote
            </Text>
            <FontAwesome5
              name="quote-left"
              style={{fontSize: 20, marginBottom: -12}}
              color="#000"
            />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                lineHeight: 26,
                letterSpacing: 1.1,
                fontWeight: '400',
                textAlign: 'center',
                marginBottom: 10,
                paddingHorizontal: 30,
              }}>
              {Quote}
            </Text>
            <FontAwesome5
              name="quote-right"
              style={{
                fontSize: 20,
                textAlign: 'right',
                marginTop: -20,
                marginBottom: 20,
              }}
              color="#000"
            />
            <Text
              style={{
                textAlign: 'right',
                fontWeight: '300',
                fontStyle: 'italic',
                fontSize: 16,
                color: '#000',
              }}>
              —— {Author}
            </Text>
            <TouchableOpacity
              onPress={randomQuote}
              style={{
                backgroundColor: isLoading
                  ? 'rgba(83, 114, 240, 0.7)'
                  : 'rgba(83, 114, 240, 1)',
                padding: 20,
                borderRadius: 30,
                marginVertical: 20,
              }}>
              <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
                {isLoading ? 'Loading...' : 'New Quote'}
              </Text>
            </TouchableOpacity>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={speakNow}
                style={{
                  borderWidth: 2,
                  borderColor: '#5372F0',
                  borderRadius: 50,
                  padding: 15,
                  backgroundColor: isSpeaking ? '#5372F0' : '#fff',
                }}>
                <FontAwesome
                  name="volume-up"
                  size={22}
                  color={isSpeaking ? '#fff' : '#5372F0'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={copyToClipboard}
                style={{
                  borderWidth: 2,
                  borderColor: '#5372F0',
                  borderRadius: 50,
                  padding: 15,
                }}>
                <FontAwesome5 name="copy" size={22} color="#5372F0" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={tweetNow}
                style={{
                  borderWidth: 2,
                  borderColor: '#5372F0',
                  borderRadius: 50,
                  padding: 15,
                }}>
                <FontAwesome name="twitter" size={22} color="#5372F0" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );

  async function onFavoriteAdd() {
    console.log(Quote);
    let id = Quote;
    try {
      await Firestore().collection('favorites').doc(id).set({
        // await Firestore().collection.users('favorites').doc(id).set({
          quote: Quote,
          author: Author,
          id: id,
          userId: Auth().currentUser.uid,
      });
      // navigation.navigate('Favorites');
      Alert.alert('Quote added to Favorites!')
    } catch (e) {
      console.log(e);
    }
  }

//   function sameQuoteError() {
//     if (user === Quote) {
//       Alert.alert('This Quote has already been add to your Favorites.')
//     } else {
//       return Alert.alert('Quote added to Favorites!')
//     }
//   }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dee2eb',
  },
});

export default QuoteScreen;
