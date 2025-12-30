import React from 'react';
import { View, Text, Image, Button, Pressable, TextInput } from 'react-native';
import { PrimaryButton } from '../PrimaryButton';
import { useMaintenanceFlow } from '../../context/MaintenanceFlowContext';

type Props = {
  nextStep: () => void;
  reduceStep: () => void;
  setOpen: (value: boolean) => void;
  styles: any;
};

export function MaintenanceStepTwo({
  nextStep,
  reduceStep,
  setOpen,
  styles,
}: Props) {
  const { state, setField } = useMaintenanceFlow();
  const [selection, setSelection] = React.useState<'DIY' | 'COMPANY' | null>(
    null,
  );

  const handleSelectDIY = () => {
    setSelection('DIY');
    setField('isDIY', true);
    setField('executedBy', 'USER');
  };

  const handleSelectCompany = () => {
    setSelection('COMPANY');
    setField('isDIY', false);
    setField('executedBy', '');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setOpen(false)}>
          <Text style={{ fontSize: 18, color: 'black' }}>✕</Text>
        </Pressable>
      </View>
      <View style={styles.box}>
        <Image
          source={require('../../../assets/boatMan.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={styles.flex}>
        <View style={{ width: '50%' }}>
          <PrimaryButton
            title="Yo"
            onPress={handleSelectDIY}
            selected={selection === 'DIY'}
          />
          <Text>Lo haras tu mismo</Text>
        </View>
        <View style={{ width: '50%' }}>
          <PrimaryButton
            title="Empresa"
            onPress={handleSelectCompany}
            selected={selection === 'COMPANY'}
          />
          <Text>Lo hara una empresa</Text>
        </View>
      </View>
      {state.draft.isDIY === false && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de la empresa</Text>
          <TextInput
            style={styles.input}
            value={state.draft.executedBy || ''}
            onChangeText={text => setField('executedBy', text)}
            placeholder="Ej: Astillero XYZ"
            placeholderTextColor="#999"
          />
        </View>
      )}
      <View style={{ marginTop: 'auto' }}>
        <View style={styles.flex}>
          <View style={{ width: '50%' }}>
            <PrimaryButton title="Continuar" onPress={nextStep} />
          </View>
          <View style={{ width: '50%' }}>
            <PrimaryButton title="back" onPress={reduceStep} />
          </View>
        </View>
      </View>
    </View>
  );
}
