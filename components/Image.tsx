import { Image as DefaultImage, ImageProps, ImageStyle } from "expo-image";
import React from "react";
import { StyleProp } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props extends ImageProps {
  alt?: string;
  src: string;
  style?: StyleProp<ImageStyle>;
}
export default function Image(props: Props) {
  const { alt, src, style } = props;
  return (
    <DefaultImage
      contentFit="fill"
      alt={alt}
      source={src}
      style={style}
      placeholder={blurhash}
      transition={1000}
      {...props}
    />
  );
}
