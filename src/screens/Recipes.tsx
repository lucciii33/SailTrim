import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderDashboard } from '../components/HeaderDashboard';
import { useForm } from '../context/useForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { useFridgeAPI } from '../context/fridgeContext';
import { useRecipeAPI } from '../context/recipeContext';

export default function RecipeScreen({ navigation }) {
  const [recipes, setRecipes] = useState('');
  const { getRecipeItemsByUserId } = useRecipeAPI();

  const getRecipesByUser = async () => {
    const items = await getRecipeItemsByUserId();
    setRecipes(items);
  };

  useEffect(() => {
    getRecipesByUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {recipes.length > 0
          ? recipes.map(recipe => {
              return (
                <TouchableOpacity
                  style={styles.recipeCard}
                  onPress={() =>
                    navigation.navigate('RecipeDetail', {
                      recipeId: recipe._id,
                    })
                  }
                  key={recipe._id}
                >
                  <Text style={styles.recipeTitle}>{recipe.name}</Text>
                  <Text style={styles.subtitle}>{recipe.time}</Text>
                </TouchableOpacity>
              );
            })
          : 'No hay recetas disponibles.'}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1A2F',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    color: '#000000ff',
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    color: '#F2F5F7',
    fontSize: 14,
    marginBottom: 4,
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F2F5F7',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#8BA3B5',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#b0d6f3ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0A1A2F',
    fontWeight: '600',
    fontSize: 16,
  },
  recipeCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6EE7B7',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 15,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 15,
  },
});
