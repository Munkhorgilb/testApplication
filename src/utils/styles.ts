import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // helpers
  footerSpacer: { height: 100 },
  contentContainer: { paddingBottom: 200 },
  contentContainerExtra: { paddingBottom: 300 },
  border0: { borderWidth: 0 },
  border1: { borderWidth: 1 },
  borderTop1: { borderTopWidth: 1 },
  borderRight1: { borderRightWidth: 1 },
  borderBottom1: { borderBottomWidth: 1, borderColor: colors.gray200 },
  borderLeft1: { borderLeftWidth: 1 },
  hidden: { display: 'none' },
  dimmed: { opacity: 0.5 },

  // font weights
  fw600: { fontWeight: '600' },
  bold: { fontWeight: 'bold' },
  fw500: { fontWeight: '500' },
  semiBold: { fontWeight: '500' },
  fw400: { fontWeight: '400' },
  normal: { fontWeight: '400' },
  fw300: { fontWeight: '300' },
  light: { fontWeight: '300' },
  fw200: { fontWeight: '200' },

  // text decoration
  underline: { textDecorationLine: 'underline' },

  // font variants
  tabularNum: { fontVariant: ['tabular-nums'] },

  // font sizes
  f9: { fontSize: 9 },
  f10: { fontSize: 10 },
  f11: { fontSize: 11 },
  f12: { fontSize: 12 },
  f13: { fontSize: 13 },
  f14: { fontSize: 14 },
  f15: { fontSize: 15 },
  f16: { fontSize: 16 },
  f17: { fontSize: 17 },
  f18: { fontSize: 18 },

  // line heights
  ['lh13-1']: { lineHeight: 13 },
  ['lh13-1.3']: { lineHeight: 16.9 }, // 1.3 of 13px
  ['lh14-1']: { lineHeight: 14 },
  ['lh14-1.3']: { lineHeight: 18.2 }, // 1.3 of 14px
  ['lh15-1']: { lineHeight: 15 },
  ['lh15-1.3']: { lineHeight: 19.5 }, // 1.3 of 15px
  ['lh16-1']: { lineHeight: 16 },
  ['lh16-1.3']: { lineHeight: 20.8 }, // 1.3 of 16px
  ['lh17-1']: { lineHeight: 17 },
  ['lh17-1.3']: { lineHeight: 22.1 }, // 1.3 of 17px
  ['lh18-1']: { lineHeight: 18 },
  ['lh18-1.3']: { lineHeight: 23.4 }, // 1.3 of 18px

  // margins
  mr2: { marginRight: 2 },
  mr5: { marginRight: 5 },
  mr10: { marginRight: 10 },
  mr20: { marginRight: 20 },
  ml2: { marginLeft: 2 },
  ml5: { marginLeft: 5 },
  ml10: { marginLeft: 10 },
  ml15: { marginLeft: 15 },
  ml20: { marginLeft: 20 },
  mt2: { marginTop: 2 },
  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  mt15: { marginTop: 15 },
  mt20: { marginTop: 20 },
  mt30: { marginTop: 30 },
  mt40: { marginTop: 40 },
  mb2: { marginBottom: 2 },
  mb5: { marginBottom: 5 },
  mb10: { marginBottom: 10 },
  mb15: { marginBottom: 15 },
  mb20: { marginBottom: 20 },
  mb30: { marginBottom: 30 },
  mb40: { marginBottom: 40 },
  mh5: { marginHorizontal: 5 },
  mv5: { marginVertical: 5 },
  mh10: { marginHorizontal: 10 },
  mv10: { marginVertical: 10 },
  mv15: { marginVertical: 15 },
  mh15: { marginHorizontal: 15 },
  mh20: { marginHorizontal: 20 },
  mv20: { marginVertical: 20 },

  // paddings
  p2: { padding: 2 },
  p5: { padding: 5 },
  p10: { padding: 10 },
  p16: { padding: 16 },
  p20: { padding: 20 },
  pr2: { paddingRight: 2 },
  pr5: { paddingRight: 5 },
  pr10: { paddingRight: 10 },
  pr20: { paddingRight: 20 },
  pl2: { paddingLeft: 2 },
  pl5: { paddingLeft: 5 },
  pl10: { paddingLeft: 10 },
  pl20: { paddingLeft: 20 },
  pt2: { paddingTop: 2 },
  pt5: { paddingTop: 5 },
  pt10: { paddingTop: 10 },
  pt20: { paddingTop: 20 },
  pb2: { paddingBottom: 2 },
  pb5: { paddingBottom: 5 },
  pb10: { paddingBottom: 10 },
  pb20: { paddingBottom: 20 },
  px5: { paddingHorizontal: 5 },
  ph20: { paddingHorizontal: 20 },
  ph16: { paddingHorizontal: 16 },
  ph10: { paddingHorizontal: 10 },
  pv20: { paddingVertical: 20 },
  pv16: { paddingVertical: 16 },
  pv10: { paddingVertical: 10 },
  pv6: { paddingVertical: 6 },
  scrollPaddingBottom: { paddingBottom: 80 },

  // flex
  flexRow: { flexDirection: 'row' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWrap: { flexWrap: 'wrap' },
  flexCol: { flexDirection: 'column' },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flexCenter: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  flexGrow0: { flexGrow: 0 },
  flexGrow1: { flexGrow: 1 },
  selfCenter: { alignSelf: 'center' },
  alignCenter: { alignItems: 'center' },
  alignBaseline: { alignItems: 'baseline' },
  justifyCenter: { justifyContent: 'center' },

  // position
  absolute: { position: 'absolute' },

  // dimensions
  w100pct: { width: '100%' },
  h100pct: { height: '100%' },
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  // text align
  textLeft: { textAlign: 'left' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },

  // border
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});
