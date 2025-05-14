import { useColorScheme } from "hooks/useColorScheme";
import { SvgXml } from "react-native-svg";
import palette from "theme/palette";

export interface ITabIcon {
  color: string;
}

export default function HomeIcon({ color }: ITabIcon) {
  const theme = useColorScheme();

  const isFilled = color === palette[theme].primary.main;

  const view = isFilled
    ? `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.5092 7.21123L17.5091 7.21114L10.0085 0.392199C9.73296 0.139911 9.37295 -1.7352e-05 8.99939 1.61392e-09C8.62583 1.73552e-05 8.26583 0.139979 7.99036 0.392293L0.490906 7.21114C0.336433 7.35185 0.212995 7.52322 0.12847 7.71432C0.0439451 7.90541 0.000190861 8.11203 0 8.32099V16.9892C0.000454817 17.3869 0.158636 17.7682 0.439842 18.0494C0.721048 18.3306 1.10231 18.4888 1.5 18.4892H16.5C16.8977 18.4888 17.279 18.3306 17.5602 18.0494C17.8414 17.7682 17.9995 17.3869 18 16.9892V8.32103C17.9998 8.11209 17.9561 7.90549 17.8716 7.71441C17.787 7.52332 17.6636 7.35195 17.5092 7.21123Z" fill="url(#paint0_linear_624_4202)"/>
  <defs>
  <linearGradient id="paint0_linear_624_4202" x1="1.51744" y1="-5.11756" x2="17.0152" y2="-4.3667" gradientUnits="userSpaceOnUse">
  <stop stop-color="${palette[theme].primary.main}"/>
  <stop offset="1" stop-color="${palette[theme].primary.main}"/>
  </linearGradient>
  </defs>
  </svg>`
    : `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.0045 8.27764L9.504 1.45873C9.36594 1.33321 9.18605 1.26367 8.99946 1.26367C8.81287 1.26368 8.63299 1.33324 8.49493 1.45876L0.995448 8.27765C0.918138 8.34794 0.856369 8.43361 0.814101 8.52917C0.771834 8.62473 0.75 8.72807 0.75 8.83256V17.5008C0.75 17.6997 0.829018 17.8905 0.96967 18.0311C1.11032 18.1718 1.30109 18.2508 1.5 18.2508H16.5C16.6989 18.2508 16.8897 18.1718 17.0303 18.0311C17.171 17.8905 17.25 17.6997 17.25 17.5008V8.83259C17.25 8.72809 17.2282 8.62474 17.1859 8.52918C17.1436 8.43361 17.0818 8.34794 17.0045 8.27764Z" stroke="#9C96AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  const BG = () => <SvgXml xml={view} />;
  return <BG />;
}
