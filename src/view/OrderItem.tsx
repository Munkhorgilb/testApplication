import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { IOrder } from '#/utils/state/schema';
import colors from '#/utils/colors';
import TextView from '#/components/TextView';
import { s } from '#/utils/styles';
import Ionicons from '@react-native-vector-icons/ionicons';
import dayjs from 'dayjs';
import { numberWithCommas } from '#/utils/utils';

const OrderItem = ({ order }: { order: IOrder }) => {
  const amount = useMemo(() => {
    return order.items.reduce((acc: any, curr: any) => {
      const current = curr?.product?.price * curr?.quantity;
      return acc + current;
    }, 0);
  }, [order.items]);

  return (
    <View style={styles.item}>
      <View style={[s.row]}>
        <View style={styles.btn}>
          <Ionicons name="document" size={22} color={colors.white} />
        </View>
        <View style={[s.ml10]}>
          <TextView bold>{order?.user?.name}</TextView>
          <TextView style={[s.mt5]} color={colors.gray5}>
            {dayjs(order?.createdAt).format('YYYY/MM/DD HH:MM')}
          </TextView>
        </View>
      </View>
      <TextView bold large>
        {numberWithCommas(amount)}₮
      </TextView>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 90,
    backgroundColor: colors.secondary,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
