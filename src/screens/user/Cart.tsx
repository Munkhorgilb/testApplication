/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { LegendList } from '@legendapp/list';
import { s } from '#/utils/styles';
import Divider from '#/components/Divider';
import { useAuth } from '#/provider/AuthProvider';
import { Image, StyleSheet, View } from 'react-native';
import TextView from '#/components/TextView';
import colors from '#/utils/colors';
import images from '#images';
import { deviceWidth, numberWithCommas } from '#/utils/utils';
import { IProduct } from '#/utils/state/schema';
import { Quantity } from '#/components/Quantity';
import { Button } from '#/components/Button';
import { useModalControls } from '#/modal/ModalProvider';
import { useApp } from '#/provider/AppProvider';
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from '#/provider/AlertProvider';

const Cart = () => {
  const { cartItems, user, setCartItems } = useAuth();
  const { orders, setOrders } = useApp();
  const alert = useAlert();

  const listEmpty = () => {
    return (
      <View style={[s.alignCenter, s.flex1, s.justifyCenter]}>
        <Image source={images.emptyCart} style={styles.image} />
        <TextView boldless color={colors.red4} style={[s.mt20]}>
          Сагс хоосон байна.
        </TextView>
      </View>
    );
  };

  const amount = useMemo(() => {
    return cartItems.reduce((acc: any, curr: any) => {
      const current = curr?.product?.price * curr?.quantity;
      return acc + current;
    }, 0);
  }, [cartItems]);

  const onSave = () => {
    if (!user) {
      return;
    }
    const newItem = {
      id: uuidv4(),
      items: cartItems,
      user: user,
      createdAt: new Date().toISOString(),
    };
    const newOrders = [...orders, newItem];
    console.log(newOrders, '+++');
    setOrders(newOrders);
    alert.success('Захиалга амжилттай хийгдлээ');
    setCartItems([]);
  };

  return (
    <View style={[s.container]}>
      <LegendList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        recycleItems
        renderItem={({ item }) => (
          <CartItem product={item?.product} quantity={item?.quantity} />
        )}
        keyExtractor={item => item?.product?.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={listEmpty}
      />
      {cartItems?.length > 0 && (
        <View style={[s.mb20]}>
          <View style={[s.rowSpaceBetween, s.mt20, s.mb10, s.mh20]}>
            <TextView color={colors.secondary}>Нийт үнийн дүн:</TextView>
            <TextView boldless large>
              {numberWithCommas(amount)}₮
            </TextView>
          </View>

          <Button style={styles.button} onPress={onSave}>
            <TextView color={colors.white}>Үргэлжлүүлэх</TextView>
          </Button>
        </View>
      )}
    </View>
  );
};

export default Cart;

const CartItem = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) => {
  const { cartItems, setCartItems } = useAuth();
  const { openModal, closeModal } = useModalControls();

  const onRemove = () => {
    openModal({
      name: 'confirm',
      title: 'Бараа хасах',
      message: 'Та барааг сагснаас хасахдаа итгэлтэй байна уу?',
      onPressConfirm: () => {
        const newCart = cartItems.filter(
          item => item.product.id !== product.id,
        );
        setCartItems(newCart);
      },
      onPressCancel: () => {
        closeModal();
      },
    });
  };

  const onChange = (newQuantity: number) => {
    const newCart = cartItems.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: newQuantity }
        : item,
    );
    setCartItems(newCart);
  };

  return (
    <View style={styles.item}>
      <View style={[s.rowSpaceBetween]}>
        <View>
          <TextView bold>{product?.name}</TextView>
          <Quantity
            initialQuantity={Number(quantity)}
            onRemove={onRemove}
            onChanged={onChange}
            onSubmit={onChange}
          />
        </View>
        <TextView color={colors.gray5} style={[s.mt5]}>
          Үнэ: {numberWithCommas(product?.price * Number(quantity))}₮
        </TextView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
  },
  item: {
    padding: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 44,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
});
