import { ReactElement } from "react";

export interface IProfileMenuItem {
  text: string;
  href?: string;
  icon: ReactElement;
  onPress?: () => void;
  showLeftArrowIcon?: boolean;
  value?: string;
  isVisible?: boolean;
}
