import React from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import { PrimaryButton } from '../PrimaryButton';

type Props = {
  nextStep: () => void;
  setOpen: (value: boolean) => void;
  styles: any;
};

export function MaintenanceStepOne({ nextStep, setOpen, styles }: Props) {
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

      <Text style={[styles.color, styles.title1]}>
        Registro de Mantenimiento Oficial
      </Text>

      <Text style={[styles.color, styles.mt10]}>
        Asegúrate de tener fotos y facturas a mano. Este reporte no es un simple
        apunte: al guardarlo, se genera una prueba criptográfica que certifica
        la fecha y el estado real de tu mantenimiento.
      </Text>

      <Text style={[styles.color, styles.mt20, styles.title2]}>
        ¿Por qué te conviene?
      </Text>

      <Text style={[styles.color, styles.mt10]}>
        Ante cualquier siniestro, el seguro buscará cualquier excusa para no
        pagar alegando falta de mantenimiento. Con este sistema, tienes una
        prueba matemática imposible de falsificar. No es tu palabra contra la de
        ellos; es un certificado digital que garantiza que cumpliste con todo a
        tiempo.
      </Text>

      <Text style={[styles.color, styles.mt20]}>
        Sin vuelta atrás. Para que este documento tenga validez legal ante
        peritos y autoridades, no puede ser editado ni borrado. Una vez que
        guardes, la información queda sellada de forma permanente. Revisa todo
        bien antes de enviar: estás creando la evidencia oficial que te protege.
      </Text>

      <PrimaryButton title="Continuar" onPress={nextStep} />
    </View>
  );
}
