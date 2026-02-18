import React, {useState, useMemo} from 'react';
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

const App = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null,
  );
  const [filterType, setFilterType] = useState<'name' | 'alcohol'>('name');

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
        <Text style={styles.title}>Bevvy</Text>
        <Text style={styles.subtitle}>100 Classic Cocktails</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${filterType === 'name' ? 'cocktail name' : 'alcohol type'}...`}
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
            onPress={() => setSelectedCocktail(item)}
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
      {/* <BannerAdComponent /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

