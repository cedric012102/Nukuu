import {StyleSheet, Dimensions} from 'react-native';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  logo: {
    height: 150,
    width: 400,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kailasa',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Kailasa',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: 'rgba(9,4,1,0.5)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});

export default styles;
