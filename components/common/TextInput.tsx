import { INPUT_LABEL_MARGIN, isIOSDevice } from "constants/common";
import { useMemo, useRef, useState } from "react";
import {
  TextInput as DefaultTextInput,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import palette from "../../theme/palette";
import { DEFAULT_SPACING, spacing } from "../../theme/spacing";
import typography from "../../theme/typography";
import Typography from "./Typography";

type variantType = "s" | "l" | "m";

export type ITextInput = {
  variant?: variantType;
  errorMessage?: string;
  Icon?: React.JSX.Element;
  multiline?: boolean;
  containerStyle?: ViewProps["style"];
  fieldStyle?: ViewProps["style"];
  label?: string;
  isRequired?: boolean;
};

export const TextInputStyle = {
  flex: 1,
  borderRadius: 5,
  marginHorizontal: DEFAULT_SPACING,
  paddingVertical: 0,
  height: spacing(9.5),
  marginVertical: 4,
  ...typography.body2,
  textAlign: "right",
};

const TextInput = (props: TextInputProps & ITextInput) => {
  const {
    style,
    variant,
    errorMessage,
    Icon,
    placeholderTextColor,
    multiline = false,
    containerStyle,
    value,
    label,
    fieldStyle,
    isRequired = false,
    onBlur,
    ...otherProps
  } = props;
  const theme = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<any>(null);

  const placeholderTextColorValue = placeholderTextColor
    ? placeholderTextColor
    : palette[theme].input.placeholder;

  const inputStyleValue: TextInputProps["style"] = [
    {
      color: palette[theme].input.text,
      ...(TextInputStyle as TextStyle),
      lineHeight: 20,
      textAlignVertical: multiline ? "top" : "center", // for the text inputs with multiple lines so the start enter from top especially for android
    },
    style,
  ];

  const isInputDisabled = props.editable === false;

  const borderWidth = 1;

  const borderColor = useMemo(() => {
    if (errorMessage) return palette[theme].error.main;

    if (isFocused) return "#3B82F6";

    return palette[theme].input.border;
  }, [isFocused]);

  const onBlurInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur && onBlur(e);
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
    if (inputRef.current && !isIOSDevice) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };
  const backgroundColor = !isInputDisabled
    ? palette[theme].input.background
    : palette[theme].input.disabledBackground;

  const hasErrorMessage = !!errorMessage && errorMessage.length > 0;
  return (
    <View style={styles.field}>
      {label && (
        <Typography
          style={{
            color: palette[theme].text.secondary,
            marginBottom: spacing(1),
            marginLeft: INPUT_LABEL_MARGIN,
          }}
          variant="label"
        >
          {`${label} ${isRequired ? "*" : ""}`}
        </Typography>
      )}
      <View style={[styles.container, fieldStyle]}>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor,
              borderRadius: spacing(2),
              borderWidth: borderWidth,
              borderColor: borderColor,
            },
            containerStyle,
          ]}
        >
          <DefaultTextInput
            ref={inputRef}
            value={value}
            placeholderTextColor={placeholderTextColorValue}
            style={inputStyleValue}
            {...otherProps}
            multiline={multiline}
            onBlur={onBlurInput}
            onFocus={onFocus}
          />
        </View>
        {hasErrorMessage && (
          <Typography
            style={{ color: palette[theme].error.main, textAlign: "left" }}
            variant={"label"}
          >
            {errorMessage}
          </Typography>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  field: {
    width: "100%",
    justifyContent: "flex-start",
  },
});

export default TextInput;
