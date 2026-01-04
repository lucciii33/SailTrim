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
import Icon from 'react-native-vector-icons/Ionicons';

import { Ship, Anchor, Plus, Compass } from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderDashboard } from '../components/HeaderDashboard';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { useFridgeAPI } from '../context/fridgeContext';
import ModalWrapper from '../components/ModalWrapper';
import AddIngredientForm from '../components/AddIngredientForm';

export default function Fridge({ navigation }) {
  type RootStackParamList = {
    Dashboard: undefined;
  };
  const { loading, getFridgeItemsById, createFridgeItem, deleteFridgeItem } =
    useFridgeAPI();
  const [modalVisible, setModalVisible] = useState(false);
  const [fridgeItems, setFridgeItems] = useState([]);

  const handleSaveItems = async items => {
    try {
      for (const item of items) {
        if (item.name && item.quantity) {
          await createFridgeItem({
            name: item.name,
            quantity: item.quantity,
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            unit: 'kg',
          });
        }
      }
      setModalVisible(false);
      Alert.alert('Éxito', 'Ingredientes agregados');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron agregar');
    }
  };

  const getFridgeByUser = async () => {
    const items = await getFridgeItemsById();
    setFridgeItems(items);
  };

  useEffect(() => {
    getFridgeByUser();
  }, []);

  const getDaysLeft = expirationDate => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));
  };

  const getCardStyle = expirationDate => {
    const days = getDaysLeft(expirationDate);

    if (days <= 1) {
      return { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' };
    }
    if (days <= 3) {
      return { backgroundColor: '#FED7AA', borderColor: '#FB923C' };
    }
    return { backgroundColor: '#D1FAE5', borderColor: '#6EE7B7' };
  };

  const removeItemFunc = async id => {
    try {
      await deleteFridgeItem(id);
      Alert.alert('Éxito', 'Ingrediente eliminado');
      setFridgeItems(fridgeItems.filter(item => item._id !== id));
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              {' '}
              <Text style={styles.title}>My Fridge Items</Text>
            </View>
            <View>
              <Icon name="cube-outline" size={24} color="#000" />
            </View>
          </View>

          <Text style={styles.subtitle}>Gestiona tus ingredientes</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
        <View style={{ width: '45%' }}>
          <PrimaryButton title="Scan" onPress={() => setModalVisible(true)} />
        </View>
        <View style={{ width: '45%' }}>
          <PrimaryButton title="Manual" onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <ScrollView>
        {fridgeItems.map(item => (
          <View
            key={item._id}
            style={[styles.fridgeCard, getCardStyle(item.expirationDate)]}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.itemName}>
                  {item.name} - {item.quantity}
                </Text>
                <Text style={styles.itemDays}>
                  {getDaysLeft(item.expirationDate) <= 0
                    ? 'Vencido'
                    : `${getDaysLeft(item.expirationDate)} días`}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Icon
                  name="trash"
                  size={24}
                  color="#000"
                  onPress={() => removeItemFunc(item._id)}
                />
                <Icon name="pencil" size={24} color="#000" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <ModalWrapper
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <View>
          <Text>Agregar Ingrediente</Text>
          <AddIngredientForm onAdd={handleSaveItems} />

          {/* Acá va el formulario */}
        </View>
      </ModalWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A2F',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
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
    height: 130,
    borderRadius: 20,
    padding: 20,
  },
  fridgeCard: {
    padding: 16,
    margin: 10,
    borderRadius: 12,
    borderWidth: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemDays: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
