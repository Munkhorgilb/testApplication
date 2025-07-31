import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import BottomSheet from '@gorhom/bottom-sheet';

import { useModals, useModalControls } from './ModalProvider';
// Generic
import * as ConfirmModal from './Confirm';
import { createCustomBackdrop } from '#/components/BottomSheetCustomBackdrop';
import colors from '#/utils/colors';

const DEFAULT_SNAPPOINTS = ['90%'];
const HANDLE_HEIGHT = 24;

export const ModalsContainer = observer(function ModalsContainer() {
  const { isModalActive, activeModals } = useModals();
  const { closeModal } = useModalControls();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const safeAreaInsets = useSafeAreaInsets();

  const activeModal = activeModals[activeModals.length - 1];

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeModal();
    }
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
    closeModal();
  };

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name]);

  let needsSafeTopInset = false;
  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS;
  let element;
  if (activeModal?.name === 'confirm') {
    snapPoints = ConfirmModal.snapPoints;
    element = <ConfirmModal.Component {...activeModal} />;
  } else {
    return null;
  }

  const topInset = needsSafeTopInset ? safeAreaInsets.top - HANDLE_HEIGHT : 0;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      topInset={topInset}
      index={isModalActive ? 0 : -1}
      enablePanDownToClose
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      backdropComponent={
        isModalActive ? createCustomBackdrop(onClose) : undefined
      }
      handleIndicatorStyle={{ backgroundColor: colors.white }}
      handleStyle={[styles.handle]}
      onChange={onBottomSheetChange}
    >
      {element}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
