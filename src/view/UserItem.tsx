import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { IUser } from '#/utils/state/schema';
import colors from '#/utils/colors';
import TextView from '#/components/TextView';
import { s } from '#/utils/styles';
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRecyclingEffect } from '@legendapp/list';
import { RectButton } from 'react-native-gesture-handler';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useModalControls } from '#/modal/ModalProvider';
import { useAlert } from '#/provider/AlertProvider';
import { useApp } from '#/provider/AppProvider';

const UserItem = ({ user }: { user: IUser }) => {
  const swipeableRef = useRef<SwipeableMethods>(undefined);
  const swipeableState = useRef(false);

  const alert = useAlert();
  const { users, setUsers } = useApp();
  const { openModal, closeModal } = useModalControls();

  const onRemove = () => {
    openModal({
      name: 'confirm',
      title: 'Хэрэглэгч устгах',
      message: 'Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?',
      onPressConfirm: () => {
        const newUsers = users.filter(item => item.id !== user.id);
        setUsers(newUsers);
        alert.success('Хэрэглэгч амжилттай устлаа.');
      },
      onPressCancel: () => {
        closeModal();
      },
    });
  };

  useRecyclingEffect(() => {
    if (swipeableState.current) {
      swipeableRef?.current?.close();
    }
  });

  const closeSwipe = () => {
    swipeableRef?.current?.close();
  };

  const renderRightActions = () => {
    return (
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
        <TextView bold>{user.name}</TextView>
        <TextView style={[s.mt5]} color={colors.gray5}>
          {user.email}
        </TextView>
      </View>
    </Swipeable>
  );
};

export default UserItem;

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
