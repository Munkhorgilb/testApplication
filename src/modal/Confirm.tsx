/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ConfirmModal, useModalControls } from './ModalProvider';
import AnimatedLottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextView from '#/components/TextView';
import colors from '#/utils/colors';
import lottie from '../../assets/lottie';
import { deviceWidth } from '#/utils/utils';
import { s } from '#/utils/styles';

export const snapPoints = ['65%'];

export function Component({
  title,
  message,
  onPressConfirm,
  onPressCancel,
  confirmBtnText,
  confirmBtnStyle,
  cancelBtnText,
}: ConfirmModal) {
  const { closeModal } = useModalControls();
  const insets = useSafeAreaInsets();

  const onPress = async () => {
    try {
      await onPressConfirm();
      closeModal();
      return;
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View
      testID="confirmModal"
      style={[
        s.container,
        {
          paddingBottom: insets.bottom + 10,
        },
      ]}
    >
      <View
        style={[
          {
            backgroundColor: colors.white,
          },
        ]}
      >
        <TextView style={styles.title}>{title}</TextView>
      </View>
      {typeof message === 'string' ? (
        <TextView style={[styles.description]}>{message}</TextView>
      ) : (
        message()
      )}

      <AnimatedLottieView
        source={lottie.waiting}
        style={styles.lottie}
        autoPlay
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        testID="confirmBtn"
        onPress={onPress}
        style={[styles.btn, confirmBtnStyle]}
        accessibilityRole="button"
        accessibilityHint=""
      >
        <TextView color={colors.white} boldless large>
          {confirmBtnText ?? (
            <TextView boldless large>
              Тийм
            </TextView>
          )}
        </TextView>
      </TouchableOpacity>
      {onPressCancel === undefined ? null : (
        <TouchableOpacity
          testID="cancelBtn"
          onPress={onPressCancel}
          style={[styles.btnCancel]}
          accessibilityRole="button"
          accessibilityHint=""
        >
          <TextView boldless large color={colors.white}>
            {cancelBtnText ?? (
              <TextView boldless large color={colors.white}>
                Үгүй
              </TextView>
            )}
          </TextView>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 26,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 22,
    color: colors.disabled,
    fontSize: 18,
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 14,
    marginTop: 22,
    marginHorizontal: 34,
    backgroundColor: '#ec4868',
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 14,
    marginHorizontal: 34,
    marginTop: 10,
    backgroundColor: colors.disabled,
  },
  lottie: {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
    alignSelf: 'center',
  },
});
