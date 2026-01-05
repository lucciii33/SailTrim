import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function ModalConfirmDelete({
  visible,
  onClose,
  onConfirm,
  nombreItem,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>¿Eliminar {nombreItem}?</Text>
          <Text style={styles.subtitulo}>
            Esta acción no se puede deshacer.
          </Text>

          <View style={styles.filaBotones}>
            <TouchableOpacity onPress={onClose} style={styles.botonCancelar}>
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm} style={styles.botonBorrar}>
              <Text style={{ color: 'white' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // El fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  subtitulo: { fontSize: 14, color: 'gray', marginVertical: 10 },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  botonCancelar: { padding: 10, marginRight: 10 },
  botonBorrar: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
  botonGuardar: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
});
