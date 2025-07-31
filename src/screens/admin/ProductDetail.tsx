import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import BackButton from '#/components/BackButton';
import { s } from '#/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import TextView from '#/components/TextView';
import { TextInput } from 'react-native-gesture-handler';
import colors from '#/utils/colors';
import { Button } from '#/components/Button';
import { useApp } from '#/provider/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { useAlert } from '#/provider/AlertProvider';

const numberWithCommas = (number: number) => {
  if (!number) {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

const ProductDetail = ({ route }: any) => {
  const { product } = route.params;

  const alert = useAlert();
  const navigation = useNavigation();
  const { products, setProducts } = useApp();

  console.log(product?.code);

  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const [variables, setVariables] = useState({
    name: product.name,
    code: product.code?.toString(),
    price: product.price,
  });

  const onSave = () => {
    const newProducts = products.map(item =>
      item.id === product.id
        ? {
            id: product?.id,
            name: variables.name,
            code: variables.code,
            price: Number(variables.price),
          }
        : item,
    );
    setProducts(newProducts);
    alert.success('Бараа амжилттай засагдлаа');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[s.container]}>
      <KeyboardAwareScrollView contentContainerStyle={[s.flex1]}>
        <BackButton />
        <View style={[s.mh20, s.mt20]}>
          <TextView large boldless>
            Барааны нэр
          </TextView>
          <TextInput
            ref={nameRef}
            value={variables?.name}
            style={[styles.input]}
            placeholderTextColor={colors.disabled}
            placeholder="Барааны нэр оруулна уу"
            onChangeText={text => {
              setVariables({ ...variables, name: text });
            }}
            autoCorrect={false}
            returnKeyType="next"
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              codeRef.current?.focus();
            }}
            autoCapitalize={'none'}
          />
        </View>
        <View style={[s.mh20, s.mt20]}>
          <TextView large boldless>
            Барааны код
          </TextView>
          <TextInput
            ref={codeRef}
            value={variables?.code}
            style={[styles.input]}
            placeholderTextColor={colors.disabled}
            placeholder="Барааны код оруулна уу"
            onChangeText={text => {
              setVariables({ ...variables, code: text });
            }}
            autoCorrect={false}
            returnKeyType="next"
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              priceRef.current?.focus();
            }}
            autoCapitalize={'none'}
          />
        </View>

        <View style={[s.mh20, s.mt20]}>
          <TextView large boldless>
            Барааны үнэ
          </TextView>
          <TextInput
            ref={priceRef}
            value={numberWithCommas(variables.price)}
            style={[styles.input]}
            placeholderTextColor={colors.disabled}
            placeholder="Барааны үнэ оруулна уу"
            onChangeText={(e: string) => {
              const parsedValue = e.replace(/\D/g, ''); // Remove non-numeric characters
              setVariables({ ...variables, price: parsedValue });
            }}
            autoCorrect={false}
            returnKeyType="done"
            keyboardType="numeric"
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize={'none'}
          />
        </View>
        <View style={s.flex1} />
        <Button style={[styles.button]} onPress={onSave}>
          <TextView large bold color={colors.white}>
            Хадгалах
          </TextView>
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

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
});
