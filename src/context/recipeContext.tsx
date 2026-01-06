import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = 'http://localhost:5000/api/recipe'; // Cambia si es necesario

export const useRecipeAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthData = async () => {
    const token = await AsyncStorage.getItem('token');
    const userDataString = await AsyncStorage.getItem('userData');

    if (!token || !userDataString) {
      throw new Error('No hay datos de usuario');
    }

    const user = JSON.parse(userDataString);
    return { token, userId: user._id };
  };

  const createRecipeItem = async itemData => {
    setLoading(true);
    setError(null);
    try {
      const { token, userId } = await getAuthData();

      const response = await fetch(`${API_URL}/createAfter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...itemData,
          owner: userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creando item');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRecipeItemsByUserId = async () => {
    setLoading(true);
    setError(null);
    try {
      const { token, userId } = await getAuthData();

      const response = await fetch(`${API_URL}/getByUserId/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error obteniendo items');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRecipeItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await getAuthData();

      const response = await fetch(`${API_URL}/updateById/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error actualizando item');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipeItem = async id => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await getAuthData();

      const response = await fetch(`${API_URL}/deleteById/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error eliminando item');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRecipeItem = async id => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await getAuthData();

      const response = await fetch(`${API_URL}/getById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error eliminando item');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateRecipe = async (time, style) => {
    setLoading(true);
    setError(null);
    try {
      const { token, userId } = await getAuthData();

      const response = await fetch('http://localhost:5000/api/recipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          time,
          style,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error generando receta');
      }

      return data.recipe;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createRecipeItem,
    getRecipeItemsByUserId,
    getRecipeItem,
    updateRecipeItem,
    deleteRecipeItem,
    generateRecipe,
  };
};
