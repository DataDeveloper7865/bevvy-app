import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

// Replace with your actual Ad Unit ID from AdMob
const AD_UNIT_ID = __DEV__ 
  ? TestIds.BANNER // Use test ID in development
  : 'ca-app-pub-2102675857529902/1002819381'; // Your actual ad unit ID

const BannerAdComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default BannerAdComponent;