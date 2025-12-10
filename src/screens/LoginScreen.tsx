import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { userService } from '../api/userService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../context/useForm';

export default function LoginScreen({ navigation }) {
  // const [formLogin, setFormLogin] = useState({
  //   email: '',
  //   hashed_password: '',
  // });

  type RootStackParamList = {
    Dashboard: undefined;
  };

  // const handleChange = (key: string, value: string | boolean) => {
  //   setFormLogin(prev => ({ ...prev, [key]: value }));
  // };
  const { form, handleChange, validate, resetForm, errors } = useForm(
    {
      email: '',
      password: '',
    },
    ['email', 'password'], // campos requeridos
  );

  const navigationDashboard =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      const res = await userService.login({
        ...form,
      });
      Alert.alert('✅ login exitoso', `Bienvenido ${res.firts_name}`);

      resetForm();

      navigationDashboard.navigate('Dashboard');
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
    source={require('../assets/login-logo.png')} // imagen local
    style={styles.logo}
    resizeMode="contain" // ajusta el tamaño sin deformar
  /> */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg',
        }} // 👈 tu URL aquí
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Pantalla de Login</Text>
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={v => handleChange('email', v)}
        autoCapitalize="none"
        style={[styles.input, errors.email && styles.inputError]}
      />
      <TextInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={v => handleChange('password', v)}
        secureTextEntry
        style={[styles.input, errors.password && styles.inputError]}
      />
      <Button title="LOGIN" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  inputError: {
    borderColor: 'red',
  },
  logo: {
    width: 500,
    height: 400,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
