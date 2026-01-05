import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = 'http://localhost:5000/api/fridge'; // Cambia si es necesario

export const useFridgeAPI = () => {
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

  const createFridgeItem = async itemData => {
    setLoading(true);
    setError(null);
    try {
      const { token, userId } = await getAuthData();

      const response = await fetch(`${API_URL}/createFridge`, {
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

  const getFridgeItemsById = async () => {
    setLoading(true);
    setError(null);
    try {
      const { token, userId } = await getAuthData();

      const response = await fetch(`${API_URL}/getFridgeByUserId/${userId}`, {
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

  const updateFridgeItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await getAuthData();

      const response = await fetch(`${API_URL}/updateFridgeById/${id}`, {
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

  const deleteFridgeItem = async id => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await getAuthData();

      const response = await fetch(`${API_URL}/deleteFridgeById/${id}`, {
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
    createFridgeItem,
    getFridgeItemsById,
    updateFridgeItem,
    deleteFridgeItem,
    generateRecipe,
  };
};
