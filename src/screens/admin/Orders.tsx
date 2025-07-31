/* eslint-disable react/no-unstable-nested-components */
import { View } from 'react-native';
import React from 'react';
import { s } from '#/utils/styles';
import { LegendList } from '@legendapp/list';
import OrderItem from '#/view/OrderItem';
import Divider from '#/components/Divider';
import Empty from '#/components/Empty';
import { useApp } from '#/provider/AppProvider';

const Orders = () => {
  const { orders } = useApp();
  return (
    <View style={[s.container]}>
      <LegendList
        data={orders}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        recycleItems
        renderItem={({ item }) => <OrderItem order={item} />}
        // keyExtractor={item => item?.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Empty text={'Одоогоор захиалга байхгүй байна.'} />}
      />
    </View>
  );
};

export default Orders;
