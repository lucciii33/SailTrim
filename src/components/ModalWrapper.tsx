import { Modal, TouchableOpacity, View, Text } from 'react-native';

export default function ModalWrapper({ visible, onClose, children }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <TouchableOpacity
        onPress={onClose}
        style={{ padding: 20, alignItems: 'flex-end' }}
      >
        <Text style={{ fontSize: 24 }}>✕</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>{children}</View>
    </Modal>
  );
}
