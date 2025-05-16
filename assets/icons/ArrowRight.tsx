import { useColorScheme } from "hooks/useColorScheme";
import { SvgXml } from "react-native-svg";
import palette from "theme/palette";

export interface IDynamicSvgProps {
  width?: number;
  height?: number;
  color?: string;
  isFilled?: boolean;
}

export default function ArrowRight({ color, width, height }: IDynamicSvgProps) {
  const theme = useColorScheme();
  const originalWidth = 48;
  const originalHeight = 48;
  const fillColor = color || palette[theme].text.primary;
  const view = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 24L35 24" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 33L35 24L26 15" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  const BG = () => (
    <SvgXml
      width={width || originalWidth}
      height={height || originalHeight}
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      xml={view}
    />
  );
  return <BG />;
}
