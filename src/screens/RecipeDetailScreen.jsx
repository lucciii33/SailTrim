import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRecipeAPI } from '../context/recipeContext';

export default function RecipeDetailScreen({ route }) {
  const { recipeId } = route.params;
  const { getRecipeItem } = useRecipeAPI();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeItem(recipeId);
      setRecipe(data);
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <Text style={{ color: 'white' }}>Cargando receta...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>⏱ {recipe.time}</Text>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {recipe.ingredientes.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Pasos</Text>
      {recipe.pasos.map((step, index) => (
        <Text key={index} style={styles.listItem}>
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A2F',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F2F5F7',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#8BA3B5',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F2F5F7',
    marginTop: 24,
    marginBottom: 12,
  },

  listItem: {
    fontSize: 15,
    color: '#D1E3F0',
    marginBottom: 8,
    lineHeight: 22,
  },
});
