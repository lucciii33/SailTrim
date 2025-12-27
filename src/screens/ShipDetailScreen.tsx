import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalWrapper from '../components/ModalWrapper';

export default function ShipDetailScreen() {
  const route = useRoute();
  const { shipId } = route.params;
  const [open, setOpen] = useState(false);

  const [ship, setShip] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const reduceStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  useEffect(() => {
    const fetchShip = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await fetch(
          `http://localhost:5000/api/ship/getShipById/${shipId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          console.log('error', data);
          return;
        }

        setShip(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (shipId) fetchShip();
  }, [shipId]);

  return (
    <View style={styles.container}>
      <Text>Ship ID: {shipId}</Text>
      {ship && <Text>{ship.name}</Text>}
      <Button title="Abrir" onPress={() => setOpen(true)} />

      <ModalWrapper visible={open} onClose={() => setOpen(false)}>
        {currentStep === 1 && (
          <View style={styles.container}>
            <View style={styles.box}>
              <Image
                source={require('../../assets/boatMan.png')}
                style={{ width: 200, height: 200 }}
              />
            </View>

            <Text style={[styles.color, styles.title1]}>
              Registro de Mantenimiento Oficial
            </Text>
            <Text style={[styles.color, styles.mt10]}>
              Asegúrate de tener fotos y facturas a mano. Este reporte no es un
              simple apunte: al guardarlo, se genera una prueba criptográfica
              que certifica la fecha y el estado real de tu mantenimiento.
            </Text>
            <Text style={[styles.color, styles.mt20, styles.title2]}>
              ¿Por qué te conviene?{' '}
            </Text>
            <Text style={[styles.color, styles.mt10]}>
              Ante cualquier siniestro, el seguro buscará cualquier excusa para
              no pagar alegando falta de mantenimiento. Con este sistema, tienes
              una prueba matemática imposible de falsificar. No es tu palabra
              contra la de ellos; es un certificado digital que garantiza que
              cumpliste con todo a tiempo.
            </Text>
            <Text style={[styles.color, styles.mt20]}>
              Sin vuelta atrás Para que este documento tenga validez legal ante
              peritos y autoridades, no puede ser editado ni borrado. Una vez
              que guardes, la información queda sellada de forma permanente.
              Revisa todo bien antes de enviar: estás creando la evidencia
              oficial que te protege.
            </Text>
            <Button title="Continuar" onPress={() => nextStep()} />
            <Button title="Cerrar" onPress={() => setOpen(false)} />
          </View>
        )}
        {currentStep === 2 && (
          <View style={styles.container}>
            <Text>Paso 2</Text>
            <Button title="Volver" onPress={() => reduceStep()} />
            <Button title="Cerrar" onPress={() => setOpen(false)} />
          </View>
        )}
      </ModalWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#257C97',
    height: '100%',
    padding: 30,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    color: '#f3f3f3ff',
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  title1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
