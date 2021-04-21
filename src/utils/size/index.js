import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const { height } = Dimensions.get('window');

const widthDesign = 375;
const heightDesign = 812 - getStatusBarHeight(); // 44

const widthScale = 350;
const heightScale = 680;

export const getHeightByPercent = (percent) => {
  if (percent > 100) {
    return height;
  }
  if (percent < 0) {
    return 0;
  }
  return (percent * height) / 100;
};

export const scaleWidth = (number) => {
  return scale((number / widthDesign) * widthScale);
};

export const scaleHeight = (number) => {
  return scale((number / heightDesign) * heightScale);
};
