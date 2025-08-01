import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import colors from '#/utils/colors';

const Divider = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return <View style={[styles.light, style]} />;
};

const styles = StyleSheet.create({
  light: {
    backgroundColor: colors.gray300,
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;
