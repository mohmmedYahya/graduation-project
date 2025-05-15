import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { ComponentProps, useCallback, useEffect, useRef } from "react";
import { Keyboard } from "react-native";

type DefaultBackdropProps = BottomSheetBackdropProps &
  ComponentProps<typeof BottomSheetBackdrop>;

export const AntiFlickerBottomSheetBackdrop = (props: DefaultBackdropProps) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );
};

export default function useBottomSheet({
  visible,
  handleCloseSheet,
  closeOnBackDropPress = true,
}: {
  closeOnBackDropPress?: boolean;
  visible: boolean;
  handleCloseSheet: () => void;
}) {
  const sheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop: React.FC<BottomSheetBackdropProps> = useCallback(
    (p) => (
      <AntiFlickerBottomSheetBackdrop
        {...p}
        pressBehavior={closeOnBackDropPress ? "close" : "none"}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [closeOnBackDropPress]
  );

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  const handleSheetDismiss = () => {
    handleCloseSheet();
  };

  const onChange = useCallback((index: number) => {
    if (sheetRef.current && index === -1) {
      handleCloseSheet();
    }
  }, []);

  return {
    handleSheetDismiss,
    renderBackdrop,
    sheetRef,
    onChange,
  };
}
