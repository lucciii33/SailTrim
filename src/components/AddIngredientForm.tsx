// components/AddIngredientForm.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default function AddIngredientForm({ onAdd }) {
  const [items, setItems] = useState([{ name: '', quantity: '' }]);

  const addNewInput = () => {
    setItems([...items, { name: '', quantity: '' }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSave = () => {
    onAdd(items);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Nombre"
            value={item.name}
            onChangeText={text => updateItem(index, 'name', text)}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Cant."
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={text => updateItem(index, 'quantity', text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addNewInput}>
        <Text style={styles.addButtonText}>+ Agregar otro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
