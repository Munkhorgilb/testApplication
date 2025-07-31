import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import React from 'react';
import images from '#images';
import { deviceWidth } from '#/utils/utils';

const Logo = ({ logoStyle }: { logoStyle?: StyleProp<ImageStyle> }) => {
  return <Image style={[styles.image, logoStyle]} source={images.logo} />;
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    borderRadius: 90,
    alignSelf: 'center',
  },
});
