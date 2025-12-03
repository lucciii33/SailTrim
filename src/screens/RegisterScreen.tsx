import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { userService } from '../api/userService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../context/useForm';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Login: undefined;
};
const countries = [
  { value: 'spain', label: 'España' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'italy', label: 'Italia' },
  { value: 'france', label: 'Francia' },
  { value: 'germany', label: 'Alemania' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'usa', label: 'Estados Unidos' },
  { value: 'canada', label: 'Canadá' },
  { value: 'ireland', label: 'Irlanda' },
  { value: 'netherlands', label: 'Países Bajos' },
  { value: 'sweden', label: 'Suecia' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'chile', label: 'Chile' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'mexico', label: 'México' },
  { value: 'venezuela', label: 'Venezuela' },
  { value: 'peru', label: 'Perú' },
  { value: 'uruguay', label: 'Uruguay' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'paraguay', label: 'Paraguay' },
  { value: 'costa_rica', label: 'Costa Rica' },
  { value: 'panama', label: 'Panamá' },
  { value: 'dominican_republic', label: 'República Dominicana' },
];

export default function RegisterScreen({ navigation }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigationLogin =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const [form, setForm] = useState({
  //   full_name: '',
  //   email: '',
  //   country: '',
  //   age: '',
  //   hashed_password: '',
  //   agree_to_terms_and_conditions: false,
  // });

  const { form, handleChange, validate, resetForm, errors } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      pais: '',
      edad: '',
      password: '',
      terms: false,
    },
    ['firstName', 'lastName', 'email', 'pais', 'password', 'edad'], // campos requeridos
  );

  // const handleChange = (key: string, value: string | boolean) => {
  //   setForm(prev => ({ ...prev, [key]: value }));
  // };

  const handleRegister = async () => {
    if (!validate()) return;
    if (!form.agree_to_terms_and_conditions) {
      Alert.alert('⚠️', 'Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      const res = await userService.register({
        ...form,
        age: form.age ? parseInt(form.age, 10) : undefined,
      });
      Alert.alert('✅ Registro exitoso', `Bienvenido ${res.data.full_name}`);

      // setForm({
      //   full_name: '',
      //   email: '',
      //   country: '',
      //   age: '',
      //   hashed_password: '',
      //   agree_to_terms_and_conditions: false,
      // });
      resetForm();

      navigationLogin.navigate('Login');
    } catch (err: any) {
      console.log(err.response?.data);
      Alert.alert(
        '❌ Error',
        err.response?.data?.detail || 'Error al registrar usuario',
      );
    }
  };
  return (
    <View style={styles.container}>
      {/* <Image
        source={{
          uri: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg',
        }} // 👈 tu URL aquí
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <Icon name="add" size={24} color="#000" />
      <TextInput
        placeholder="Nombre completo"
        value={form.firstName}
        onChangeText={v => handleChange('firstName', v)}
        style={[
          styles.input,
          errors.firstName && styles.inputError, // 👈 borde rojo si falta
        ]}
      />
      <TextInput
        placeholder="Nombre completo"
        value={form.lastName}
        onChangeText={v => handleChange('lastName', v)}
        style={[
          styles.input,
          errors.lastName && styles.inputError, // 👈 borde rojo si falta
        ]}
      />
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={v => handleChange('email', v)}
        autoCapitalize="none"
        style={[styles.input, errors.email && styles.inputError]}
      />
      {/* <Picker
        selectedValue={form.country}
        onValueChange={v => handleChange('country', v)}
        style={[styles.input]}
      >
        <Picker.Item label="Selecciona un país" value="" />
        {countries.map(c => (
          <Picker.Item key={c.value} label={c.label} value={c.value} />
        ))}
      </Picker> */}
      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          style={[
            styles.input,
            errors.pais && styles.inputError, // 👈 igual para el dropdown
          ]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={{ color: form.pais ? '#000' : '#888' }}>
            {form.pais
              ? countries.find(c => c.value === form.pais)?.label
              : 'Selecciona un país'}
          </Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={countries}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleChange('pais', item.value);
                    setShowDropdown(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <TextInput
        placeholder="Edad"
        value={form.edad}
        onChangeText={v => handleChange('edad', v)}
        keyboardType="numeric"
        style={[styles.input, errors.edad && styles.inputError]}
      />
      <TextInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={v => handleChange('password', v)}
        secureTextEntry
        style={[styles.input, errors.hashed_password && styles.inputError]}
      />

      <View style={styles.switchContainer}>
        <Text>Acepto los términos y condiciones</Text>
        <Switch
          value={form.terms}
          onValueChange={v => handleChange('terms', v)}
        />
      </View>

      <Button title="Registrarme" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  picker: {
    height: 45,
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    zIndex: 100,
    maxHeight: 200,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputError: { borderColor: 'red' },
  logo: {
    width: 500,
    height: 400,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
