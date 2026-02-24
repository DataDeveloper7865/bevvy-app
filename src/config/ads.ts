import {ADMOB_BANNER_AD_UNIT_ID, ADMOB_INTERSTITIAL_AD_UNIT_ID} from '@env';
import {TestIds} from 'react-native-google-mobile-ads';

const normalizeAdUnitId = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const getBannerAdUnitId = (): string | null =>
  __DEV__ ? TestIds.BANNER : normalizeAdUnitId(ADMOB_BANNER_AD_UNIT_ID);

export const getInterstitialAdUnitId = (): string | null =>
  __DEV__
    ? TestIds.INTERSTITIAL
    : normalizeAdUnitId(ADMOB_INTERSTITIAL_AD_UNIT_ID);
