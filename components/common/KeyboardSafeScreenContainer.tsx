import React from "react";
import { ViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { spacing } from "../../theme/spacing";
import ScreenContainer, { ScreenContainerProps } from "./ScreenContainer";

const KeyboardSafeScreenContainer = (
  props: ViewProps & ScreenContainerProps
) => {
  const { children, ...other } = props;

  return (
    <ScreenContainer showBackButton={false} {...other}>
      <KeyboardAwareScrollView
        extraScrollHeight={spacing(25)}
        extraHeight={spacing(20)}
        enableOnAndroid={true}
        contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default KeyboardSafeScreenContainer;
