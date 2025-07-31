import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  Pressable,
  ViewStyle,
} from 'react-native';
import TextView from './TextView';
import colors from '#/utils/colors';

function choose<U, T extends Record<string, U>>(value: keyof T, choices: T): U {
  return choices[value];
}

type Event =
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  | GestureResponderEvent;

export type ButtonType = 'primary' | 'secondary' | 'primaryOutline';

// TODO: Enforce that button always has a label
export function Button({
  type = 'primary',
  label,
  style,
  labelStyle,
  onPress,
  children,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityLabelledBy,
  onAccessibilityEscape,
  disabled = false,
}: React.PropsWithChildren<{
  type?: ButtonType;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityLabelledBy?: string;
  onAccessibilityEscape?: () => void;
  disabled?: boolean;
}>) {
  const typeOuterStyle = choose<ViewStyle, Record<ButtonType, ViewStyle>>(
    type,
    {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.neutralPrimaryColor,
      },
      primaryOutline: {
        borderWidth: 1,
        borderColor: colors.primary,
      },
    },
  );
  const typeLabelStyle = choose<TextStyle, Record<ButtonType, TextStyle>>(
    type,
    {
      primary: {
        color: colors.blackWhite,
        fontWeight: '600',
      },
      secondary: {
        color: colors.blackWhite,
        fontWeight: '500',
      },
      primaryOutline: {
        color: colors.primary,
        fontWeight: '500',
      },
    },
  );

  const onPressWrapped = React.useCallback(
    (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      onPress?.();
    },
    [onPress],
  );

  const getStyle = React.useCallback(
    (state: any) => {
      const arr = [typeOuterStyle, styles.outer, style];
      if (state.pressed) {
        arr.push({ opacity: 0.6 });
      } else if (state.hovered) {
        arr.push({ opacity: 0.8 });
      }
      return arr;
    },
    [typeOuterStyle, style],
  );

  return (
    <Pressable
      disabled={disabled}
      style={getStyle}
      onPress={onPressWrapped}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityLabelledBy={accessibilityLabelledBy}
      onAccessibilityEscape={onAccessibilityEscape}
    >
      {label ? (
        <TextView style={[typeLabelStyle, labelStyle]}>{label}</TextView>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
  },
});
