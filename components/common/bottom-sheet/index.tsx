import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { isIOSDevice, isSmallScreen, SCREEN_HEIGHT } from "constants/common";
import { useColorScheme } from "hooks/useColorScheme";
import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Easing } from "react-native-reanimated";
import palette from "theme/palette";
import { spacing } from "theme/spacing";
import useBottomSheet from "./hooks/useBottomSheet";

export interface IBottomSheet {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  snapPointsValues?: string[];
  handleCloseSheet: () => void;
  visible: boolean;
  closeOnPanDown?: boolean;
  closeOnBackDropPress?: boolean;
}
const DynamicSheetModal = (props: IBottomSheet) => {
  const theme = useColorScheme();
  const {
    children,
    style,
    visible,
    handleCloseSheet,
    closeOnPanDown = true,
    closeOnBackDropPress = true,
  } = props;

  const { renderBackdrop, handleSheetDismiss, sheetRef, onChange } =
    useBottomSheet({ closeOnBackDropPress, visible, handleCloseSheet });

  const animationConfigs = useMemo(
    () => ({
      duration: 500,
      easing: Easing.out(Easing.exp),
      damping: 15,
      mass: 1,
      stiffness: 200,
    }),
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      enableDynamicSizing={true}
      animateOnMount={true}
      animationConfigs={animationConfigs}
      onDismiss={handleSheetDismiss}
      onChange={onChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={closeOnPanDown}
      handleStyle={styles.handleIndicator}
      keyboardBlurBehavior="restore"
      keyboardBehavior={"interactive"}
      enableOverDrag={false}
      enableContentPanningGesture={false}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          {
            backgroundColor: palette[theme].common.white,
            maxHeight: SCREEN_HEIGHT * 0.9,
          },
          style,
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const paddingBottom = (() => {
  if (isIOSDevice && !isSmallScreen) return spacing(14);
  if (isSmallScreen) return spacing(8);
  return spacing(10);
})();

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom,
  },
  handleIndicator: {
    backgroundColor: palette["light"].common.white,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
});

export default DynamicSheetModal;
