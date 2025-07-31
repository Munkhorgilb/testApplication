import { StyleSheet, View } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import lottie from '../../assets/lottie';
import { deviceWidth } from '#/utils/utils';
import { s } from '#/utils/styles';
import TextView from './TextView';
import colors from '#/utils/colors';

const Empty = ({ text }: { text: string }) => {
  return (
    <View style={[s.alignCenter, s.flex1, s.justifyCenter]}>
      <AnimatedLottieView
        source={lottie.empty}
        style={styles.lottie}
        autoPlay
      />
      <TextView boldless color={colors.red4} style={[s.mt20]}>
        {text}
      </TextView>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  lottie: {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
  },
});
