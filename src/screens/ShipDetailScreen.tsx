import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalWrapper from '../components/ModalWrapper';
import { MaintenanceStepOne } from '../components/Maintenance/MaintenanceStepOne';
import { MaintenanceStepTwo } from '../components/Maintenance/MaintenanceStepTwo';

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
    setCurrentStep(prev => prev - 1);
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
          <MaintenanceStepOne
            nextStep={nextStep}
            setOpen={setOpen}
            styles={styles}
          />
        )}
        {currentStep === 2 && (
          <MaintenanceStepTwo
            nextStep={nextStep}
            reduceStep={reduceStep}
            setOpen={setOpen}
            styles={styles}
          />
        )}
        {currentStep === 3 && (
          <View style={styles.container}>
            <Text>Paso 3</Text>
            <Button title="Volver" onPress={() => reduceStep()} />
            <Button title="Cerrar" onPress={() => setOpen(false)} />
          </View>
        )}
        {currentStep === 4 && (
          <View style={styles.container}>
            <Text>Paso 4</Text>
            <Button title="Volver" onPress={() => reduceStep()} />
            <Button title="Cerrar" onPress={() => setOpen(false)} />
          </View>
        )}
        {currentStep === 5 && (
          <View style={styles.container}>
            <Text>Paso 4</Text>
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
  flex: {
    flexDirection: 'row',
    gap: 20,
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
