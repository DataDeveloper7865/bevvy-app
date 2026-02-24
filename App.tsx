import React, {useState, useMemo, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import {cocktails, Cocktail} from './src/data/cocktails';
import CocktailCard from './src/components/CocktailCard';
import CocktailDetail from './src/components/CocktailDetail';
import BannerAdComponent from './src/components/BannerAd';
import mobileAds, {
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {getInterstitialAdUnitId} from './src/config/ads';

const App = (): React.JSX.Element => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null,
  );
  const [_pendingCocktail, setPendingCocktail] = useState<Cocktail | null>(
    null,
  );
  const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);
  const [filterType, setFilterType] = useState<'name' | 'alcohol'>('name');

  const interstitialAdUnitId = useMemo(() => getInterstitialAdUnitId(), []);
  const interstitial = useMemo(
    () =>
      interstitialAdUnitId
        ? InterstitialAd.createForAdRequest(interstitialAdUnitId, {
            requestNonPersonalizedAdsOnly: true,
          })
        : null,
    [interstitialAdUnitId],
  );

  useEffect(() => {
    mobileAds()
      .initialize()
      .catch(() => {
        // No-op: app should continue even if ads initialization fails.
      });
  }, []);

  useEffect(() => {
    if (!interstitial) {
      return;
    }

    const loadedSubscription = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setIsInterstitialLoaded(true);
      },
    );

    const closedSubscription = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsInterstitialLoaded(false);
        interstitial.load();

        setPendingCocktail(currentPendingCocktail => {
          if (currentPendingCocktail) {
            setSelectedCocktail(currentPendingCocktail);
          }
          return null;
        });
      },
    );

    const errorSubscription = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setIsInterstitialLoaded(false);
        interstitial.load();

        setPendingCocktail(currentPendingCocktail => {
          if (currentPendingCocktail) {
            setSelectedCocktail(currentPendingCocktail);
          }
          return null;
        });
      },
    );

    interstitial.load();

    return () => {
      loadedSubscription();
      closedSubscription();
      errorSubscription();
    };
  }, [interstitial]);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  const filteredCocktails = useMemo(() => {
    if (!searchQuery.trim()) {
      return cocktails;
    }

    const query = searchQuery.toLowerCase().trim();

    if (filterType === 'name') {
      return cocktails.filter(cocktail =>
        cocktail.name.toLowerCase().includes(query),
      );
    } else {
      return cocktails.filter(cocktail =>
        cocktail.alcoholType.toLowerCase().includes(query),
      );
    }
  }, [searchQuery, filterType]);

  const uniqueAlcoholTypes = useMemo(() => {
    const types = new Set(cocktails.map(c => c.alcoholType));
    return Array.from(types).sort();
  }, []);

  const handleCocktailPress = (cocktail: Cocktail) => {
    if (interstitial && isInterstitialLoaded) {
      setPendingCocktail(cocktail);
      interstitial.show();
      return;
    }

    setSelectedCocktail(cocktail);
    interstitial?.load();
  };

  if (isSplashVisible) {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.splashEmoji}>🍸</Text>
        <Text style={styles.splashTitle}>Emerald Shaker</Text>
        <Text style={styles.splashTagline}>Mixing classics...</Text>
      </SafeAreaView>
    );
  }

  if (selectedCocktail) {
    return (
      <CocktailDetail
        cocktail={selectedCocktail}
        onBack={() => setSelectedCocktail(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Emerald Shaker</Text>
        <Text style={styles.subtitle}>100 Classic Cocktails</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${
            filterType === 'name' ? 'cocktail name' : 'alcohol type'
          }...`}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'name' && styles.filterButtonActive,
            ]}
            onPress={() => {
              setFilterType('name');
              setSearchQuery('');
            }}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'name' && styles.filterButtonTextActive,
              ]}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'alcohol' && styles.filterButtonActive,
            ]}
            onPress={() => {
              setFilterType('alcohol');
              setSearchQuery('');
            }}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'alcohol' && styles.filterButtonTextActive,
              ]}>
              Alcohol Type
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {filterType === 'alcohol' && !searchQuery && (
        <View style={styles.alcoholTypesContainer}>
          <Text style={styles.alcoholTypesTitle}>Browse by Alcohol Type:</Text>
          <View style={styles.alcoholTypesGrid}>
            {uniqueAlcoholTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={styles.alcoholTypeChip}
                onPress={() => setSearchQuery(type)}>
                <Text style={styles.alcoholTypeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={filteredCocktails}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CocktailCard
            cocktail={item}
            onPress={() => handleCocktailPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No cocktails found. Try a different search.
            </Text>
          </View>
        }
      />
      <BannerAdComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#0f7a47',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  splashEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  splashTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  splashTagline: {
    marginTop: 10,
    fontSize: 16,
    color: '#d6f3e4',
    letterSpacing: 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  alcoholTypesContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  alcoholTypesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  alcoholTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  alcoholTypeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e8e8e8',
  },
  alcoholTypeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default App;
