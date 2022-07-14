import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  cardHolder: {
    flexBasis: '46%',
    height: '25%',
    flexDirection: 'row',
  },
  favoriteQuoteText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Kailasa',
    fontStyle: 'italic',
    alignSelf: 'center',
    padding: 10,
    marginHorizontal: 30,
    color: 'blue',
  },
  profileIcon: {
    borderRadius: 475,
    backgroundColor: 'white',
    marginVertical: 32,
  },
  icon: {
    marginTop: 15,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 25,
    borderRadius: 20,
  },
  cardTitle: {
    color: 'black',
    fontFamily: "Kailasa",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default styles;