import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {getBannerAdUnitId} from '../config/ads';

const BannerAdComponent: React.FC = () => {
  const [hasLoadError, setHasLoadError] = useState(false);
  const unitId = getBannerAdUnitId();

  if (!unitId || hasLoadError) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Ad unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={() => {
          setHasLoadError(true);
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
  fallbackContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  fallbackText: {
    fontSize: 12,
    color: '#777',
  },
});

export default BannerAdComponent;
