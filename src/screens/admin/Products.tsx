/* eslint-disable react/no-unstable-nested-components */
import {
  Keyboard,
  Pressable,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import useDebounce from '#/hooks/useDebounce';
import { SearchInput } from '#/components/SearchInput';
import { s } from '#/utils/styles';
import { LegendList, useRecyclingEffect } from '@legendapp/list';
import Divider from '#/components/Divider';
import Empty from '#/components/Empty';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from '#/utils/colors';
import { NavigationProp } from '../Routes';
import { IProduct } from '#/utils/state/schema';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import TextView from '#/components/TextView';
import { numberWithCommas } from '#/utils/utils';
import { useApp } from '#/provider/AppProvider';
import { useModalControls } from '#/modal/ModalProvider';
import { useAlert } from '#/provider/AlertProvider';

const Products = () => {
  const navigation = useNavigation<NavigationProp>();

  const { products } = useApp();

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={[s.mr20]}
          onPress={() => {
            navigation.navigate('Import');
          }}
        >
          <Ionicons name="add" size={24} color={colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation]);

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

export default Products;

const ProductItem = ({ product }: { product: IProduct }) => {
  const swipeableRef = useRef<SwipeableMethods>(undefined);
  const swipeableState = useRef(false);

  const alert = useAlert();
  const navigation = useNavigation<any>();
  const { products, setProducts } = useApp();
  const { openModal, closeModal } = useModalControls();

  useRecyclingEffect(() => {
    if (swipeableState.current) {
      swipeableRef?.current?.close();
    }
  });

  const closeSwipe = () => {
    swipeableRef?.current?.close();
  };

  const onRemove = () => {
    openModal({
      name: 'confirm',
      title: 'Бараа устгах',
      message: 'Та энэ барааг устгахдаа итгэлтэй байна уу?',
      onPressConfirm: () => {
        const newProducts = products.filter(item => item.id !== product.id);
        setProducts(newProducts);
        alert.success('Бараа амжилттай устлаа.');
      },
      onPressCancel: () => {
        closeModal();
      },
    });
  };

  const renderRightActions = () => {
    return (
      <View style={s.row}>
        <RectButton
          style={[
            styles.rightAction,
            {
              backgroundColor: colors.blue1,
            },
          ]}
          onPress={() => {
            closeSwipe();
            swipeableRef?.current?.close();
            navigation.navigate('ProductDetail', { product: product });
          }}
        >
          <Ionicons name={'pencil'} size={24} color={colors.white} />
          <TextView boldless style={[s.mt5]} color={colors.white}>
            Засах
          </TextView>
        </RectButton>
        <RectButton
          style={[styles.rightAction]}
          onPress={() => {
            closeSwipe();
            swipeableRef?.current?.close();
            onRemove();
          }}
        >
          <Ionicons name={'trash'} size={24} color={colors.white} />
          <TextView boldless style={[s.mt5]} color={colors.white}>
            Устгах
          </TextView>
        </RectButton>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={true}
      ref={swipeableRef as any}
      onSwipeableWillOpen={() => {
        swipeableState.current = true;
      }}
      onSwipeableWillClose={() => {
        swipeableState.current = false;
      }}
    >
      <View style={styles.item}>
        <TextView bold>{product?.name}</TextView>
        <View style={[s.rowSpaceBetween, s.mt10]}>
          <TextView color={colors.gray5}>{product.code}</TextView>
          <TextView color={colors.gray5}>
            {numberWithCommas(product?.price)}₮
          </TextView>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  rightAction: {
    width: 80,
    height: '100%',
    backgroundColor: colors.red3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
