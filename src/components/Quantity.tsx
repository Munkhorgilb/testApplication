import { deviceWidth } from '#/utils/utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';

type QuantityProps = {
  initialQuantity: number;
  min?: number;
  max?: number;
  onChanged: (value: number) => void;
  onRemove: () => void;
  onSubmit: (value: number) => void;
};

export const Quantity: React.FC<QuantityProps> = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onChanged,
  onRemove,
  onSubmit,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity.toString());

  const value = parseInt(quantity, 10) || min;
  const isMin = value <= min;
  const isMax = value >= max;
  const showTrash = isMin;

  const updateQuantity = (newValue: number) => {
    if (newValue < min || newValue > max) return;
    setQuantity(newValue.toString());
    onChanged(newValue);
  };

  const handleDecrease = () => {
    if (showTrash) {
      onRemove?.();
    } else if (!isMin) {
      updateQuantity(value - 1);
    }
  };

  const handleIncrease = () => {
    if (!isMax) {
      updateQuantity(value + 1);
    }
  };

  const handleTextChange = (text: string) => {
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      setQuantity(parsed.toString());
    } else {
      setQuantity(text);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleDecrease} disabled={!showTrash && isMin}>
        <Ionicons
          name={showTrash ? 'trash' : 'remove'}
          size={24}
          color={showTrash ? 'red' : isMin ? 'grey' : 'black'}
        />
      </Pressable>

      <TextInput
        style={styles.input}
        value={quantity}
        keyboardType="numeric"
        onChangeText={handleTextChange}
        textAlign="center"
        onSubmitEditing={() => {
          onSubmit(Number(quantity));
        }}
        returnKeyType="done"
      />

      <Pressable onPress={handleIncrease} disabled={isMax}>
        <Ionicons name="add" size={24} color={isMax ? 'grey' : 'black'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 6,
    width: deviceWidth / 3,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: 40,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    marginHorizontal: 4,
  },
});
