import colors from '#/utils/colors';
import { s } from '#/utils/styles';
import React from 'react';
import {
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TextView from './TextView';

export function MagnifyingGlassIcon() {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        stroke={colors.gray400}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
      />
    </Svg>
  );
}

interface Props {
  query: string | undefined;
  setIsInputFocused?: (v: boolean) => void;
  onChangeQuery: any;
  onSubmitQuery: () => void;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  placeholder?: string;
  [key: string]: any;
}
export function SearchInput({
  query,
  setIsInputFocused,
  onChangeQuery,
  style,
  autoFocus,
  placeholder = 'Search',
  onSubmitQuery,
  ...props
}: Props) {
  const textInput = React.useRef<TextInput>(null);

  return (
    <View style={[s.row]}>
      <View style={[styles.inputContainer, style]}>
        <MagnifyingGlassIcon />
        <TextInput
          testID="searchTextInput"
          ref={textInput}
          autoFocus={autoFocus}
          placeholder={placeholder}
          selectTextOnFocus
          returnKeyType="search"
          value={query}
          style={[styles.input]}
          onFocus={() => setIsInputFocused?.(true)}
          onBlur={() => setIsInputFocused?.(false)}
          onChangeText={onChangeQuery}
          onSubmitEditing={() => {
            onSubmitQuery();
            Keyboard.dismiss();
          }}
          accessibilityRole="search"
          accessibilityHint=""
          autoCorrect={false}
          autoCapitalize="none"
          selectionColor={colors.primary}
          {...props}
        />
        {query && (
          <Pressable
            onPress={() => {
              onChangeQuery('');
              Keyboard.dismiss();
            }}
          >
            <TextView small style={s.ml10} color={colors.gray500}>
              Cancel
            </TextView>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  icon: {
    marginRight: 6,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 17,
    minWidth: 0, // overflow mitigation for firefox
    paddingLeft: 10,
    height: 25,
    paddingVertical: 0,
  },
  cancelBtn: {
    paddingLeft: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
