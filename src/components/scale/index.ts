// import { Dimensions, PixelRatio } from "react-native"

// const BASE_WIDTH = 375
// const BASE_HEIGHT = 667

// const getScreenWidth = () => Dimensions.get("window").width
// const getScreenHeight = () => Dimensions.get("window").height

// export const scale = (size: number): number => {
//   const SCREEN_WIDTH = getScreenWidth()
//   const SCREEN_HEIGHT = getScreenHeight()
//   const scaleWidth = SCREEN_WIDTH / BASE_WIDTH
//   const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT
//   const scaleFactor = Math.min(scaleWidth, scaleHeight)
//   return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleFactor))
// }

// export const verticalScale = (size: number): number => {
//   const SCREEN_HEIGHT = getScreenHeight()
//   const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT
//   return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleHeight))
// }

// export const moderateScale = (size: number, factor = 0.5): number => {
//   return size + (scale(size) - size) * factor
// }

// export const scaleFont = (size: number): number => {
//   return moderateScale(size, 0.3)
// }

// export const wp = (percentage: number): number => {
//   const SCREEN_WIDTH = getScreenWidth()
//   return (percentage * SCREEN_WIDTH) / 100
// }

// export const hp = (percentage: number): number => {
//   const SCREEN_HEIGHT = getScreenHeight()
//   return (percentage * SCREEN_HEIGHT) / 100
// }

// export const isTablet = (): boolean => {
//   const SCREEN_WIDTH = getScreenWidth()
//   return SCREEN_WIDTH >= 768
// }

// export const isSmallDevice = (): boolean => {
//   const SCREEN_WIDTH = getScreenWidth()
//   return SCREEN_WIDTH < 375
// }

// export const isLargeDevice = (): boolean => {
//   const SCREEN_WIDTH = getScreenWidth()
//   return SCREEN_WIDTH > 414
// }


import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) => shortDimension / guidelineBaseWidth * size;
export const verticalScale = (size: number) => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;