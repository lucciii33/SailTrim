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

export default function DashboardScreen({ navigation }) {
  const { getPets, allPets } = PetService();
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUser = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData._id; // Extrae el ID

        Alert.alert('📌 PARSED DATA', JSON.stringify(userData, null, 2));

        if (userId) {
          console.log(`Buscando user para el usuario ID: ${userId}`);
          // await getPets(userId);
        } else {
          console.error(
            'ID de usuario no encontrado en los datos de AsyncStorage.',
          );
        }
      } else {
        console.error('No se encontraron datos de usuario en AsyncStorage.');
      }
    } catch (error) {
      console.error('Error al cargar las mascotas:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <HeaderDashboard onAddPress={() => setModalVisible(true)} />
      {/* <Text style={styles.infoText}>
        {allPets.length > 0
          ? `Mascotas encontradas: ${allPets.length}`
          : 'Cargando mascotas o ninguna registrada...'}
      </Text> */}
      {/* <ScrollView style={{ width: '100%' }}>
        {allPets.map(pet => (
          <PetCard
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            image={pet.profile_photo}
          />
        ))}
      </ScrollView> */}
      <Button
        title="Volver al Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Volver al Register"
        onPress={() => navigation.navigate('Register')}
      />
      <CreatePetFlow
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
  },
});
