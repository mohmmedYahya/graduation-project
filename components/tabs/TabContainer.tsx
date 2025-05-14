import { Typography } from "components/common";
import { HapticTab } from "components/HapticTab";
import { useColorScheme } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import palette from "theme/palette";
import { spacing } from "theme/spacing";

const CONTAINER_HEIGHT = spacing(14);

export default function TabContainer(props: any) {
  const theme = useColorScheme();
  const { onPress, style, title, Icon, to, testID } = props;

  const isSelected = props?.["aria-selected"];

  const color = isSelected
    ? palette[theme].primary.main
    : palette[theme].text.secondary;

  return (
    <HapticTab
      testID={`${testID}_${to}`}
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: CONTAINER_HEIGHT,
      }}
      onPress={onPress}
    >
      <View
        style={{
          justifyContent: isSelected ? "space-between" : "flex-end",
          alignItems: "center",
          height: "100%",
        }}
      >
        {isSelected && (
          <View
            style={{
              backgroundColor: palette[theme].primary.main,
              width: spacing(8),
              height: 2,
              borderRadius: 2,
            }}
          />
        )}
        <View
          style={{
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {Icon && <Icon color={color} />}
          <Typography
            style={{
              color,
            }}
            variant={"placeholder2"}
          >
            {title}
          </Typography>
        </View>
      </View>
    </HapticTab>
  );
}
