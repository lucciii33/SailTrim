import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  selected?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  selected = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        selected && styles.selected,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: '#A0A0A0',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
});
