import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Cocktail} from '../data/cocktails';

interface CocktailCardProps {
  cocktail: Cocktail;
  onPress: () => void;
}

const CocktailCard: React.FC<CocktailCardProps> = ({cocktail, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cocktailName}>{cocktail.name}</Text>
          <View style={styles.alcoholTypeBadge}>
            <Text style={styles.alcoholTypeText}>{cocktail.alcoholType}</Text>
          </View>
        </View>
        <Text style={styles.glassType} numberOfLines={1}>
          {cocktail.glass}
        </Text>
        <Text style={styles.ingredientsPreview} numberOfLines={2}>
          {cocktail.ingredients.slice(0, 3).join(' • ')}
          {cocktail.ingredients.length > 3 ? '...' : ''}
        </Text>
        <Text style={styles.pairingsPreview} numberOfLines={1}>
          Pair with: {cocktail.foodPairings.join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cocktailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  alcoholTypeBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alcoholTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  glassType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  ingredientsPreview: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  pairingsPreview: {
    marginTop: 8,
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
});

export default CocktailCard;
