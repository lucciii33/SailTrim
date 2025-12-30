import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PrimaryButton } from '../PrimaryButton';
import { useMaintenanceFlow } from '../../context/MaintenanceFlowContext';

type Props = {
  nextStep: () => void;
  reduceStep: () => void;
  setOpen: (value: boolean) => void;
  styles: any;
};

export function MaintenanceStepThree({
  nextStep,
  reduceStep,
  setOpen,
  styles,
}: Props) {
  const { state, setField } = useMaintenanceFlow();
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => setOpen(false)}>
          <Text style={{ fontSize: 18, color: 'black' }}>✕</Text>
        </Pressable>
      </View>

      <Text style={[styles.color, styles.title2]}>Sistema y fecha</Text>

      {/* SISTEMA */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sistema afectado</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={state.draft.systemAffected || ''}
            onValueChange={value => {
              setField('systemAffected', value);
              if (value !== 'Motor') {
                setField('hoursMeter', undefined);
              }
            }}
          >
            <Picker.Item label="Selecciona un sistema" value="" />
            <Picker.Item label="Motor" value="Motor" />
            <Picker.Item label="Eléctrico" value="Eléctrico" />
            <Picker.Item label="Casco" value="Casco" />
            <Picker.Item label="Velas" value="Velas" />
            <Picker.Item label="Timón" value="Timón" />
          </Picker>
        </View>
      </View>

      {/* FECHA */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha del trabajo</Text>

        <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: '#000' }}>
            {state.draft.recordTime
              ? new Date(state.draft.recordTime).toLocaleString()
              : 'Seleccionar fecha'}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={
              state.draft.recordTime
                ? new Date(state.draft.recordTime)
                : new Date()
            }
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (!selectedDate) return;

              setField('recordTime', selectedDate.toISOString());
            }}
          />
        )}
      </View>

      {/* HORAS MOTOR */}
      {state.draft.systemAffected === 'Motor' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Horas del motor</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 1385"
            placeholderTextColor="#999"
            value={
              state.draft.hoursMeter !== undefined
                ? String(state.draft.hoursMeter)
                : ''
            }
            onChangeText={text => setField('hoursMeter', Number(text))}
          />
        </View>
      )}

      {/* Footer */}
      <View style={{ marginTop: 'auto' }}>
        <View style={styles.flex}>
          <View style={{ width: '50%' }}>
            <PrimaryButton title="Continuar" onPress={nextStep} />
          </View>
          <View style={{ width: '50%' }}>
            <PrimaryButton title="Back" onPress={reduceStep} />
          </View>
        </View>
      </View>
    </View>
  );
}
