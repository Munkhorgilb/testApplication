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
import TextView from '#/components/TextView';
import colors from '#/utils/colors';
import { Button } from '#/components/Button';
import Ionicons from '@react-native-vector-icons/ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAuth } from '#/provider/AuthProvider';
import { useAlert } from '#/provider/AlertProvider';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Routes';
import Logo from '#/components/Logo';

const SignIn = () => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [variables, setVariables] = useState({
    email: 'admin@example.com',
    password: 'Admin@123',
  });
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const alert = useAlert();
  const navigation = useNavigation<NavigationProp>();

  const loginHandler = useCallback(() => {
    setLoading(true);
    const result = login(variables.email, variables.password);
    if (result === 'error') {
      setTimeout(() => {
        alert.error(
          'Нэвтрэхэд алдаа гарлаа. И-мейл эсвэл нууц үг буруу байна.',
        );
        setLoading(false);
      }, 2000);
    }
  }, [alert, login, variables.email, variables.password]);

  return (
    <SafeAreaView style={[s.container]}>
      <KeyboardAwareScrollView contentContainerStyle={[s.flex1]}>
        <View style={s.flex1} />
        <Logo />
        <View style={[s.mh20, s.mt40]}>
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
        <Button
          disabled={loading}
          style={[styles.button]}
          onPress={loginHandler}
        >
          <TextView large bold color={colors.white}>
            Нэвтрэх
          </TextView>
          {loading && <ActivityIndicator style={s.ml10} color={colors.white} />}
        </Button>
        <View style={s.flex1} />
        <Pressable
          style={[s.row, s.justifyCenter]}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <TextView color={colors.disabled}>Бүртгэлгүй юу? </TextView>
          <TextView boldless color={colors.primary}>
            Бүртгэл үүсгэх
          </TextView>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

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
