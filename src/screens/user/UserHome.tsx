/* eslint-disable react/no-unstable-nested-components */
import { Keyboard, RefreshControl, View } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import useDebounce from '#/hooks/useDebounce';
import * as persisted from '#/utils/state';
import { LegendList } from '@legendapp/list';
import { s } from '#/utils/styles';
import Divider from '#/components/Divider';
import Empty from '#/components/Empty';
import { SearchInput } from '#/components/SearchInput';
import ProductItem from '#/view/ProductItem';
import colors from '#/utils/colors';

const UserHome = () => {
  const products = persisted.get('products') || [];

  const [search, onSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const searchValue = useDebounce(search, 500); // 500ms delay

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const emptyText = useMemo(() => {
    if (searchValue !== '') {
      return 'Хайлтанд тохирох бараа олдсонгүй.';
    } else {
      return 'Барааны мэдээлэл байхгүй байна.';
    }
  }, [searchValue]);

  return (
    <View style={[s.container]}>
      <SearchInput
        query={search}
        onChangeQuery={onSearch}
        onSubmitQuery={() => {
          Keyboard.dismiss();
        }}
        placeholder="Бараа хайх"
        returnKeyType="search"
        style={[s.mh20, s.mt20]}
      />
      <LegendList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        recycleItems
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={item => item?.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Empty text={emptyText} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default UserHome;
