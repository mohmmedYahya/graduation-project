import { useColorScheme } from "hooks/useColorScheme";
import { SvgXml } from "react-native-svg";
import palette from "theme/palette";
import { ITabIcon } from "./HomeIcon";

export default function TabPersonIcon({ color }: ITabIcon) {
  const theme = useColorScheme();

  const isFilled = color === palette[theme].primary.main;

  const view = isFilled
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.7441 19.8728C20.3446 17.4624 18.1035 15.6546 15.4516 14.7969C16.722 14.041 17.7091 12.8889 18.2614 11.5176C18.8136 10.1463 18.9004 8.63165 18.5084 7.20626C18.1164 5.78086 17.2673 4.52357 16.0916 3.62749C14.9158 2.73141 13.4783 2.24609 12 2.24609C10.5217 2.24609 9.08428 2.73141 7.9085 3.62749C6.73273 4.52357 5.88364 5.78086 5.49165 7.20626C5.09965 8.63165 5.18644 10.1463 5.73868 11.5176C6.29091 12.8889 7.27805 14.041 8.54848 14.7969C5.89668 15.6546 3.65557 17.4624 2.25611 19.8726C2.19015 19.9866 2.15537 20.116 2.15527 20.2477C2.15518 20.3794 2.18977 20.5088 2.25558 20.6229C2.32138 20.737 2.41607 20.8317 2.53012 20.8976C2.64417 20.9635 2.77356 20.9982 2.90527 20.9982L21.0949 20.9984C21.2266 20.9984 21.356 20.9637 21.4701 20.8978C21.5841 20.8319 21.6788 20.7372 21.7446 20.6231C21.8104 20.509 21.845 20.3796 21.8449 20.2479C21.8448 20.1161 21.81 19.9868 21.7441 19.8728L21.7441 19.8728Z" fill="url(#paint0_linear_698_8388)"/>
  <defs>
  <linearGradient id="paint0_linear_698_8388" x1="3.81516" y1="-2.94428" x2="20.7612" y2="-2.05877" gradientUnits="userSpaceOnUse">
  <stop stop-color="${palette[theme].primary.main}"/>
  <stop offset="1" stop-color="${palette[theme].primary.main}"/>
  </linearGradient>
  </defs>
  </svg>`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="#9C96AA" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493" stroke="#9C96AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  const BG = () => <SvgXml xml={view} />;
  return <BG />;
}
