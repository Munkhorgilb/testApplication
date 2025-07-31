import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useAuth } from '#/provider/AuthProvider';
import { s } from '#/utils/styles';
import TextView from '#/components/TextView';
import colors from '#/utils/colors';
import images from '#images';
import { deviceWidth } from '#/utils/utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <View style={[s.container]}>
      <View>
        <Image
          source={images.background}
          style={styles.image}
          resizeMode="stretch"
        />
        <Image source={images.profile} style={styles.avatarStyle} />
      </View>
      <View style={[s.alignCenter]}>
        <TextView style={styles.text}>{user?.name}</TextView>
        <TextView boldless style={[s.mt10]} color={colors.gray400}>
          {user?.email}
        </TextView>
      </View>
      {!user?.isAdmin && (
        <Pressable
          style={[styles.item]}
          onPress={() => {
            navigation.navigate('MyOrders');
          }}
        >
          <TextView boldless color={colors.gray500}>
            Захиалгын жагсаалт харах
          </TextView>
          <Ionicons
            name="chevron-forward-outline"
            size={22}
            color={colors.gray500}
          />
        </Pressable>
      )}
      <View style={s.flex1} />
      <Pressable style={[s.mb20, s.alignCenter]} onPress={logout}>
        <TextView color={colors.red4} bold large>
          Гарах
        </TextView>
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  image: {
    width: deviceWidth,
    height: deviceWidth * 0.45,
  },
  avatarStyle: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'white',
    width: 120,
    height: 120,
    bottom: -40,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 99,
  },
  text: {
    marginTop: 60,
    fontSize: 32,
    fontWeight: '500',
  },
  item: {
    borderColor: colors.border,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
