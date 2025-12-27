import { Modal, View } from 'react-native';

export default function ModalWrapper({ visible, onClose, children }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1 }}>{children}</View>
    </Modal>
  );
}
