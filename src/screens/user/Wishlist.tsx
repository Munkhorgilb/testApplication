/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { LegendList } from '@legendapp/list';
import { s } from '#/utils/styles';
import ProductItem from '#/view/ProductItem';
import Divider from '#/components/Divider';
import Empty from '#/components/Empty';
import { View } from 'react-native';
import { useAuth } from '#/provider/AuthProvider';

const Wishlist = () => {
  const { wishlistItems } = useAuth();

  return (
    <View style={[s.container]}>
      <LegendList
        showsVerticalScrollIndicator={false}
        data={wishlistItems}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        recycleItems
        renderItem={({ item }) => (
          <ProductItem product={item} fromWishlist={true} />
        )}
        keyExtractor={item => item?.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Empty text={'Хадгалсан бараа байхгүй байна.'} />}
      />
    </View>
  );
};

export default Wishlist;
