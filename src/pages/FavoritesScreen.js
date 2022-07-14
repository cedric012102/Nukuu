import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Alert} from 'react-native';
import styles from './styles/FavoritesScreenStyle';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const FavoritesScreen = ({item, navigation}) => {
  const [favorites, setFavorites] = useState([]); //will be an empty array

  const handleDelete = quote => {
    Alert.alert(
      'Remove Quote From Favorites',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(quote),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = quote => {
    console.log('Current Post Id: ', quote);

    firestore()
      .collection('favorites')
      .doc(quote)

      .delete()
      .then(() => {
        console.log('quote deleted!');
      })
      .catch(e => {
        console.log('Error while deleting the image. ', e);
      });
  };

  useEffect(onSyncFavorites, []);

  return (
    <LinearGradient
    colors={['#255C99', '#F4B393', '#7EA3CC']}
    style={styles.container}>
    <View style={styles.container}>
      <FlatList
        bounces={false}
        keyExtractor={(_, index) => index}
        data={favorites}
        renderItem={({item}) => (
          <View style={styles.card}>
              <Text style={styles.cardTitle}>"{item.quote}"</Text>
              <Text style={styles.favoriteQuoteText}>- {item.author}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.quote)}>
              <Text style={styles.icon}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
    </LinearGradient>
  );

  function onSyncFavorites() {
    const unsubscribe = firestore()
      .collection('favorites')
      .where('userId', '==', Auth().currentUser.uid)
      .onSnapshot({
        next: collection => {
          const collectionDocuments = collection.docs.map(item => item.data());
          setFavorites(collectionDocuments);
        },
      });

    return unsubscribe;
  }
};

export default FavoritesScreen;
