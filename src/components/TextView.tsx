/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

type TTextView = TextProps & {
  xxsmall?: boolean;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  xxxxlarge?: boolean;
  bold?: boolean;
  boldless?: boolean;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  capitalize?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  flex?: boolean;
  lineHeight?: number;
  center?: boolean;
  color?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const TextView: React.FC<TTextView> = ({
  xxsmall,
  xsmall,
  small,
  large,
  xlarge,
  xxlarge,
  xxxlarge,
  xxxxlarge,
  bold,
  boldless,
  italic,
  children,
  style,
  capitalize,
  uppercase,
  lowercase,
  flex,
  lineHeight,
  center,
  color,
  onPress,
  ...rest
}) => {
  return (
    <Text
      style={[
        flex && { flex: 1 },
        xxsmall && { fontSize: 8 },
        xsmall && { fontSize: 10 },
        small && { fontSize: 12 },
        large && { fontSize: 16 },
        xlarge && { fontSize: 18 },
        xxlarge && { fontSize: 20 },
        xxxlarge && { fontSize: 25 },
        xxxxlarge && { fontSize: 30 },
        bold && { fontWeight: 'bold' },
        boldless && { fontWeight: '600' },
        italic && { fontStyle: 'italic' },
        capitalize && { textTransform: 'capitalize' },
        uppercase && { textTransform: 'uppercase' },
        lowercase && { textTransform: 'lowercase' },
        center && { textAlign: 'center' },
        { color },
        { lineHeight },
        style,
      ]}
      onPress={onPress}
      maxFontSizeMultiplier={1}
      ellipsizeMode="tail"
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TextView;
