import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import TextView from '#/components/TextView';
import { useAlert } from '#/provider/AlertProvider';
import { useAuth } from '#/provider/AuthProvider';
import colors from '#/utils/colors';
import { IProduct } from '#/utils/state/schema';
import { s } from '#/utils/styles';
import { numberWithCommas } from '#/utils/utils';
import Ionicons from '@react-native-vector-icons/ionicons';

const ProductItem = ({
  product,
  fromWishlist = false,
}: {
  product: IProduct;
  fromWishlist?: boolean;
}) => {
  const { user, cartItems, setCartItems, wishlistItems, setWishlistItems } =
    useAuth();
  const alert = useAlert();

  const isHearted = wishlistItems?.some(
    wishlist => wishlist?.id === product?.id,
  );

  const onAddToCart = (type: string) => {
    if (!user) return;
    if (type === 'cart') {
      const newCart = cartItems?.some(item => item.product.id === product.id)
        ? cartItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...(cartItems || []), { product, quantity: 1 }];

      setCartItems(newCart);

      if (fromWishlist) {
        const newWishlist = wishlistItems.filter(
          item => item.id !== product.id,
        );
        setWishlistItems(newWishlist);
      }

      alert.success('Амжилттай сагсанд нэмэгдлээ');
      return;
    } else {
      const newWishlist = isHearted
        ? wishlistItems.filter(item => item.id !== product.id)
        : [...wishlistItems, product];
      setWishlistItems(newWishlist);
      isHearted
        ? alert.info('Хадгалсан бараанаас хасагдлаа.')
        : alert.success('Амжилттай бараа хадгаллаа');
    }
  };

  return (
    <View style={styles.item}>
      <View style={[s.rowSpaceBetween]}>
        <View>
          <TextView bold>{product?.name}</TextView>
          <TextView color={colors.gray5} style={[s.mt5]}>
            {numberWithCommas(product?.price)}₮
          </TextView>
        </View>
        <View style={[s.row]}>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: isHearted ? colors.red2 : colors.red4,
              },
            ]}
            onPress={() => {
              onAddToCart('heart');
            }}
          >
            <Ionicons name="heart" size={22} color={colors.white} />
          </Pressable>
          <Pressable
            onPress={() => {
              onAddToCart('cart');
            }}
            style={[styles.btn, s.ml10]}
          >
            <Ionicons name="cart" size={22} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  btn: {
    borderRadius: 90,
    backgroundColor: colors.secondary,

    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
