import React from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => <Button title="Skip" color="#000000" {...props} />;

const Next = ({...props}) => <Button title="Next" color="#000000" {...props} />;

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#f7e7ce',
          image: (
            <Image
              source={require('../assets/images/YouAreEnough.jpeg')}
              style={{
                width: 200,
                height: 200,
                marginVertical: 50,
                borderRadius: 475,
              }}
            />
          ),
          title: 'Chosen',
          subtitle: 'Read through hundreds of quotes that may resonate with you.',
        },
        {
          backgroundColor: '#8DA9C4',
          image: (
            <Image
              source={require('../assets/images/Journey.jpeg')}
              style={{
                width: 200,
                height: 200,
                marginVertical: 50,
                borderRadius: 475,
              }}
            />
          ),
          title: 'Give',
          subtitle: 'Save or share your quotes with the world.',
        },
        {
          backgroundColor: '#CDFFF9',
          image: (
            <Image
              source={require('../assets/images/Far.jpeg')}
              style={{
                width: 200,
                height: 200,
                marginVertical: 50,
                borderRadius: 475,
              }}
            />
          ),
          title: 'Hear',
          subtitle:
            'Listen to the quote. Let it speak to you.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;