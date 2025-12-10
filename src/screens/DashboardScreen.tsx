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

export default function DashboardScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const createShip = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) {
        Alert.alert('Error', 'No hay datos de usuario');
        return;
      }

      const user = JSON.parse(userDataString);
      const userId = user._id;

      const body = {
        ...form,
        owner: userId,
      };

      const res = await fetch('http://localhost:5000/api/ship/createShip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.message || 'No se pudo crear el barco');
        return;
      }

      Alert.alert('Success', 'Ship created successfully!');
      resetForm();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Hubo un problema creando el barco');
    }
  };

  const { form, handleChange, validate, resetForm, errors } = useForm(
    {
      name: '',
      owner: '',
      flag: '',
      registerNumber: '',
      yearBuilt: '',
      lengthOverall: '',
      beam: '',
      displacement: '',
      mainEngineHours: '',
      generatorHours: '',
      nextInspectionDate: '',
    },
    [
      'name',
      'owner',
      'flag',
      'registerNumber',
      'yearBuilt',
      'lengthOverall',
      'beam',
      'displacement',
      'mainEngineHours',
      'generatorHours',
      'nextInspectionDate',
    ],
  );

  type RootStackParamList = {
    Myships: undefined;
  };

  const navigationMyShips =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navegateToShips = () => {
    navigationMyShips.navigate('Myships');
  };

  return (
    <View style={styles.container}>
      {/* <HeaderDashboard onAddPress={() => setModalVisible(true)} /> */}
      <ScrollView style={{ width: '100%' }}>
        <View>
          <Text style={styles.title}>Create Your Ship</Text>
          <Text style={styles.subtitle}>
            Each ship has its own secure logbook and maintenance history. You
            can register one or multiple vessels — everything stays organized
            and protected.
          </Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="name"
          value={form.name}
          onChangeText={v => handleChange('name', v)}
          style={[styles.input, errors?.name && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Flag</Text>
        <TextInput
          placeholder="flag"
          value={form.flag}
          onChangeText={v => handleChange('flag', v)}
          style={[styles.input, errors.flag && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Register Number</Text>
        <TextInput
          placeholder="registerNumber"
          value={form.registerNumber}
          onChangeText={v => handleChange('registerNumber', v)}
          style={[styles.input, errors.registerNumber && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Year Built</Text>
        <TextInput
          placeholder="yearBuilt"
          value={form.yearBuilt}
          onChangeText={v => handleChange('yearBuilt', v)}
          style={[styles.input, errors.yearBuilt && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Length Overall</Text>
        <TextInput
          placeholder="lengthOverall"
          value={form.lengthOverall}
          onChangeText={v => handleChange('lengthOverall', v)}
          style={[styles.input, errors.lengthOverall && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Beam</Text>
        <TextInput
          placeholder="beam"
          value={form.beam}
          onChangeText={v => handleChange('beam', v)}
          style={[styles.input, errors.beam && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Displacement</Text>
        <TextInput
          placeholder="displacement"
          value={form.displacement}
          onChangeText={v => handleChange('displacement', v)}
          style={[styles.input, errors.displacement && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Main Engine Hours</Text>
        <TextInput
          placeholder="mainEngineHours"
          value={form.mainEngineHours}
          onChangeText={v => handleChange('mainEngineHours', v)}
          style={[styles.input, errors.mainEngineHours && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Generator Hours</Text>
        <TextInput
          placeholder="generatorHours"
          value={form.generatorHours}
          onChangeText={v => handleChange('generatorHours', v)}
          style={[styles.input, errors.generatorHours && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <Text style={styles.label}>Next Inspection Date</Text>
        <TextInput
          placeholder="nextInspectionDate"
          value={form.nextInspectionDate}
          onChangeText={v => handleChange('nextInspectionDate', v)}
          style={[styles.input, errors.nextInspectionDate && styles.inputError]}
          placeholderTextColor="#afc4d1ff"
        />
        <TouchableOpacity style={styles.button} onPress={createShip}>
          <Text style={styles.buttonText}>Create Ship</Text>
        </TouchableOpacity>
        <Button title="test" onPress={() => navegateToShips()} />
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
    color: '#ffffffff',
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
    color: '#F2F5F7', // blanco náutico
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
    color: '#0A1A2F', // azul marino (contraste perfecto)
    fontWeight: '600',
    fontSize: 16,
  },
});
