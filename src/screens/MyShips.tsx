import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { PetService } from '../api/petService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetCard } from '../components/PetCard';
import { HeaderDashboard } from '../components/HeaderDashboard';
import CreatePetFlow from '../components/CreatePetFlow2';

export default function Myships({ navigation }) {
  const [ships, setShips] = useState([]);
  const fetchShips = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) {
        Alert.alert('Error', 'No hay datos de usuario');
        return;
      }

      const user = JSON.parse(userDataString);
      const userId = user._id;

      const res = await fetch(
        `http://localhost:5000/api/ship/getShipByUserId/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      Alert.alert('DEBUG RESPONSE', JSON.stringify(data, null, 2));
      setShips(data);

      if (!res.ok) {
        Alert.alert('Error', data || 'No se pudo crear el barco');
        return;
      }

      Alert.alert('Success', 'Ships loaded');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Hubo un problema creando el barco');
    }
  };

  useEffect(() => {
    fetchShips();
  }, []);

  return (
    <View style={styles.container}>
      {ships.map(ship => {
        return (
          <view key={ship._id}>
            <Text>{ship?.name}</Text>
          </view>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1A2F',
  },
});
