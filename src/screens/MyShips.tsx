import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ship, Anchor, Plus, Compass } from 'lucide-react-native';

import { PetService } from '../api/petService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetCard } from '../components/PetCard';
import { HeaderDashboard } from '../components/HeaderDashboard';
import CreatePetFlow from '../components/CreatePetFlow2';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
      // Alert.alert('DEBUG RESPONSE', JSON.stringify(data, null, 2));
      setShips(data);

      if (!res.ok) {
        Alert.alert('Error', data || 'No se pudo crear el barco');
        return;
      }

      // Alert.alert('Success', 'Ships loaded');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Hubo un problema creando el barco');
    }
  };

  useEffect(() => {
    fetchShips();
  }, []);

  type RootStackParamList = {
    Dashboard: undefined;
  };

  const navigationMyShips =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navegateToShips = () => {
    navigationMyShips.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {ships.length > 0 && (
        <View>
          <Text style={styles.subtitle} onPress={() => navegateToShips()}>
            hola
          </Text>
        </View>
      )}

      {ships.length > 0 ? (
        <ScrollView>
          {ships.map(ship => {
            return (
              <View key={ship._id} style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text>{ship?.name}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.box}>
          <Anchor size={30} color="#000" />
          <Text style={styles.subtitle}>
            Hello sailor! The first thing you need to do is register your boats.
          </Text>
          <Text>Tap “Add Boat” to continue!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navegateToShips()}
          >
            <Text style={styles.buttonText}>Add Boat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#0A1A2F',
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    width: '90%',
    height: 260,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8BA3B5',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#b0d6f3ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#0A1A2F',
    fontWeight: '600',
    fontSize: 16,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    height: 400,
    borderRadius: 20,
    padding: 20,
  },
});
