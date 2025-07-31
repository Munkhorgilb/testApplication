import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '#/utils/colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

const BackButton = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={[styles.btn]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="arrow-back-outline" size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 4,
    marginLeft: 20,
  },
});
