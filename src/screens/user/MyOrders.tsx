/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useApp } from '#/provider/AppProvider';
import { useAuth } from '#/provider/AuthProvider';
import { s } from '#/utils/styles';
import OrderItem from '#/view/OrderItem';
import Empty from '#/components/Empty';
import Divider from '#/components/Divider';
import BackButton from '#/components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';

const MyOrders = () => {
  const { user } = useAuth();
  const { orders } = useApp();

  const myOrders = orders?.filter(item => item.user.id === user?.id) || [];

  return (
    <SafeAreaView style={[s.container]}>
      <BackButton />
      <FlatList
        data={myOrders}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        // recycleItems
        renderItem={({ item }) => <OrderItem order={item} />}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Empty text={'Та захиалга хийгээгүй байна.'} />}
      />
    </SafeAreaView>
  );
};

export default MyOrders;
