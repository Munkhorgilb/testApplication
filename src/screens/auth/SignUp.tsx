import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from '#/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import BackButton from '#/components/BackButton';
import Logo from '#/components/Logo';
import TextView from '#/components/TextView';
import { Button } from '#/components/Button';
import colors from '#/utils/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '#/provider/AuthProvider';
import { useAlert } from '#/provider/AlertProvider';

const SignUp = () => {
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [variables, setVariables] = useState({
    name: 'Munkh-orgil',
    email: 'monkhorgilbayarbaatar@gmail.com',
    password: 'Admin@123',
  });

  const { register } = useAuth();
  const alert = useAlert();

  const onSave = useCallback(() => {
    setLoading(true);
    const result = register(variables);
    if (result === 'user_exists') {
      return setTimeout(() => {
        alert.error('Энэ и-мейл хаяг бүртгэлтэй байна');
        setLoading(false);
      }, 2000);
    }
    if (result === 'success') {
      return alert.success('Бүртгэл амжилттай');
    }
  }, [alert, register, variables]);

  return (
    <SafeAreaView style={[s.container]}>
      <KeyboardAwareScrollView contentContainerStyle={[s.flex1]}>
        <BackButton />
        <View style={s.flex1} />
        <Logo />
        <View style={[s.mh20, s.mt40]}>
          <TextView large boldless>
            Нэр
          </TextView>
          <TextInput
            ref={nameRef}
            value={variables?.name}
            style={[styles.input]}
            placeholderTextColor={colors.disabled}
            placeholder="Нэрээ оруулна уу"
            onChangeText={text => {
              setVariables({ ...variables, name: text });
            }}
            autoCorrect={false}
            returnKeyType="next"
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              emailRef.current?.focus();
            }}
          />
        </View>
        <View style={[s.mh20, s.mt20]}>
          <TextView large boldless>
            И-мейл хаяг
          </TextView>
          <TextInput
            ref={emailRef}
            value={variables?.email}
            style={[styles.input]}
            placeholderTextColor={colors.disabled}
            placeholder="Е-майл хаягаа оруулна уу"
            onChangeText={text => {
              setVariables({ ...variables, email: text });
            }}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            autoCapitalize={'none'}
          />
        </View>
        <View style={[s.mh20, s.mt20]}>
          <TextView large boldless>
            Нууц үг
          </TextView>
          <TextInput
            ref={passwordRef}
            value={variables?.password}
            style={[styles.input]}
            selectionColor={colors.primary}
            placeholderTextColor={colors.disabled}
            placeholder="*****"
            onChangeText={text => {
              setVariables({ ...variables, password: text });
            }}
            autoCorrect={false}
            secureTextEntry={showPassword}
            returnKeyType="done"
            autoCapitalize="none"
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eye}
            hitSlop={44}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
            />
          </Pressable>
        </View>
        <Button disabled={loading} style={[styles.button]} onPress={onSave}>
          <TextView large bold color={colors.white}>
            Бүртгүүлэх 
          </TextView>
          {loading && <ActivityIndicator style={s.ml10} color={colors.white} />}
        </Button>
        <View style={s.flex1} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 0.5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 54,
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  eye: { position: 'absolute', right: 20, bottom: 16 },
});
