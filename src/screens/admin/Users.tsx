/* eslint-disable react/no-unstable-nested-components */
import { Keyboard, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import useDebounce from '#/hooks/useDebounce';
import { s } from '#/utils/styles';
import { SearchInput } from '#/components/SearchInput';
import UserItem from '#/view/UserItem';
import Divider from '#/components/Divider';
import { IUser } from '#/utils/state/schema';
import { LegendList } from '@legendapp/list';
import Empty from '#/components/Empty';
import { useApp } from '#/provider/AppProvider';

const Users = () => {
  const { users: persistedUsers } = useApp();
  const users = persistedUsers?.filter((user: IUser) => !user.isAdmin) || [];

  const [search, onSearch] = useState('');
  const searchValue = useDebounce(search, 500); // 500ms delay

  const fileredUsers = users.filter(user =>
    user?.email?.toLowerCase().includes(searchValue?.toLowerCase()),
  );

  const emptyText = useMemo(() => {
    if (searchValue?.length > 0) {
      return 'Хайлтанд тохирох хэрэглэгч олдсонгүй.';
    } else {
      return 'Хэрэглэгчийн мэдээлэл байхгүй байна.';
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
        placeholder="Хэрэглэгч хайх"
        returnKeyType="search"
        style={[s.mh20, s.mt20]}
      />
      <LegendList
        data={fileredUsers}
        contentContainerStyle={[s.flexGrow1, s.mt10]}
        recycleItems
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={item => item?.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Empty text={emptyText} />}
      />
    </View>
  );
};

export default Users;
