import React, { useState } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const DEBOUNCED_TIME = 200;

export default function DebouncedTouchableOpacity({
  onPress,
  children,
  ...props
}: TouchableOpacityProps) {
  const [lastPress, setLastPress] = useState(0);

  const handlePress = (event: GestureResponderEvent) => {
    const currentTime = new Date().getTime();

    if (currentTime - lastPress > DEBOUNCED_TIME) {
      setLastPress(currentTime);
      onPress && onPress(event);
    }
  };

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
}
