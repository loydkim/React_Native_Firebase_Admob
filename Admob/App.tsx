/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
} from '@react-native-admob/admob';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(
    null,
  );
  const [adLoaded, setAdLoaded] = useState(false);

  // Test interstitial
  const interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);

  /*** If you want to use your AD unit Id ***/

  // const interstitial = InterstitialAd.createAd(
  //   Platform.OS === 'ios'
  //     ? 'YOUR_IOS_INTERSTITIALAD_UNIT_ID' // ex) ca-app-pub-6884803621329557/4984547374
  //     : 'YOUR_ANDROID_INTERSTITIALAD_UNIT_ID', // ex) ca-app-pub-6884803621329557/1290798655
  // );

  useEffect(() => {
    setInterstitialAd(interstitial);

    const subscriptions = [
      interstitial.addEventListener('adLoaded', () => {
        console.log('interstitial loaded');
        setAdLoaded(true);
      }),
    ];

    return () => subscriptions.forEach(sub => sub.remove());
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <BannerAd size={BannerAdSize.ADAPTIVE_BANNER} unitId={TestIds.BANNER} />

        {/* <BannerAd // If you want to use your AD unit Id
          size={BannerAdSize.ADAPTIVE_BANNER}
          unitId={
            Platform.OS === 'ios'
              ? 'YOUR_IOS_BANNER_UNIT_ID' // ex) ca-app-pub-6884803621329557/6570474671
              : 'YOUR_ANDROID_INTERSTITIALAD_UNIT_ID' // ex) ca-app-pub-6884803621329557/1927139197
          }
        /> */}

        <Button
          title="Show full AD"
          onPress={() => {
            if (adLoaded) {
              console.log('show Full Ad');
              interstitialAd?.show();
              setInterstitialAd(interstitial);
            } else {
              console.log('Not adLoaded');
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
