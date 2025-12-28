import React from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import { PrimaryButton } from '../PrimaryButton';

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
          <PrimaryButton title="Yo" onPress={nextStep} />
          <Text>Lo haras tu mismo</Text>
        </View>
        <View style={{ width: '50%' }}>
          <PrimaryButton title="Empresa" onPress={nextStep} />
          <Text>Lo hara una empresa</Text>
        </View>
      </View>
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
