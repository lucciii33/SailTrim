import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function EditIngredientForm({ item, onInfoChange }) {
  // 1. Iniciamos el estado con lo que ya tiene el item (pollo, arroz, etc)
  const [formData, setFormData] = useState({
    name: item?.name || '',
    quantity: item?.quantity?.toString() || '',
  });

  // 2. Esta función actualiza el objeto y avisa al padre (Fridge) del cambio
  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onInfoChange(updated); // <-- Importante: esto manda la info a Fridge.js
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={v => handleChange('name', v)}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={formData.quantity}
        keyboardType="numeric"
        onChangeText={v => handleChange('quantity', v)}
        placeholder="Cantidad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
