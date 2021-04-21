import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import { heightScreen, widthScreen } from '@utils/dimensions';

function SvgComponent(props) {
  const height = heightScreen / 3;
  const width = widthScreen / 1.2;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 295 295"
      fill="none"
      {...props}
    >
      <Path d="M56 1C34.6 4.7 17.6 20.2 8.5 44.4c-3.2 8.5-6.3 21-7.3 29.6-.4 3.6-.7 48.8-.7 100.5v94l2.9 6.2c1.8 3.9 4.7 8 7.8 10.9 4.3 4 5.2 4.5 8.1 3.9 3.7-.8 5.3-2 7-4.9.9-1.6 1.3-26.3 1.7-98.1.5-95.4.6-96 2.8-104 9.6-34.8 34.6-49.4 64.9-38 3.7 1.4 29.5 15.7 57.3 31.8l50.5 29.2 16 .5 16 .5.6 4.7c.8 5.4 5 13.6 8.8 17.1 1.4 1.4 11.7 7.7 22.7 14.1l20.1 11.6h33l.6 5c.7 5.8 4.9 14.9 8.6 18.4 1.4 1.3 121.6 71.1 267 155.1C742.3 416.4 864 487 867.4 489.2c10.5 7 28.2 25.8 37.5 39.7 15.2 22.9 26.8 50.5 32.2 76.6 2.1 10.2 2.3 14.5 2.8 57l.6 46 2.9 6.2c1.6 3.6 4.7 8 7.1 10.2l4.2 3.9 21.9.7c24.9.9 29.7.3 32.8-3.8 2-2.8 2.1-3.8 2.1-43 0-36.5-.4-49.6-1.9-58.2-.3-1.7-.8-4.4-1-6-1.7-11.9-8.2-36.2-14.1-52.2-6.5-17.5-19.5-42.9-29.9-58.3-5.4-8-10.1-14.7-10.5-15-.3-.3-2.4-2.8-4.6-5.5-7.7-9.7-25.2-26.4-33.5-32-2.5-1.6-4.7-3.3-5-3.7-.3-.4-3.7-2.4-7.5-4.6-3.9-2.1-32.2-18.4-63-36.2-134.9-77.9-269.9-155.8-375-216.5-44.5-25.6-82.8-47.8-84.9-49.2-4.8-3.1-4.2-3-22.9-3.2-11.2-.1-14.7-.4-14.6-1.4.8-4.1-5.5-17.8-10-22-1.4-1.3-11.1-7.3-21.6-13.2-10.4-5.9-19.3-11.3-19.7-11.9-.4-.6-6.8-1.3-16.5-1.6l-15.8-.5-.4-2.5c-.8-6.3-10.4-22.4-12.9-21.8-1.2.3-8.2-3.5-8.2-4.4 0-.4-.6-.8-1.4-.8-.8 0-2.1-.6-2.8-1.3-.7-.7-3.1-2.1-5.3-3.1-2.2-1-4.7-2.4-5.5-3.1-.8-.7-3.7-2.5-6.5-4-8.1-4.4-14-7.9-14.5-8.5-.3-.3-2.4-1.4-4.7-2.4-2.4-1.1-4.3-2.2-4.3-2.6 0-.5-1.1-1.1-2.4-1.4-1.4-.3-3.1-1.2-3.9-2-.8-.8-2.9-2.2-4.8-3-1.9-.9-5.5-2.9-8.1-4.6-2.6-1.6-7.3-4.3-10.5-6.1-8.7-4.8-12.7-7.2-13.4-8.2-.3-.4-1.2-1-2-1.1-.8-.1-4-1.5-7.3-2.9-3.2-1.5-6.4-2.7-7-2.7-.7 0-1.6-.4-2.2-1-.9-.9-2.5-1.2-14.9-3C109 0 62.1 0 56 1zM6 333.3c-1.4.7-3.3 2.8-4.3 4.7-1.6 3.2-1.7 7-1.5 46.5.3 41.9.4 43.1 2.5 48.5 2.8 6.7 8.8 14.4 12.6 15.8 3.7 1.4 7.6.2 10.1-3.2 2-2.7 2.1-4.1 2.4-44.2.2-35.2 0-42.5-1.3-47.7-1.8-7.1-7.4-16.3-11-17.9-1.4-.6-2.5-1.5-2.5-2s-.4-.7-.9-.3c-.5.3-1.2.1-1.6-.5-.8-1.3-1.4-1.2-4.5.3zM3.6 476.3c-1.3 1.3-2.7 4-3.1 5.8-.8 4.5 0 300.4.8 304.6.4 1.8 1.1 6.3 1.7 10 7 44 27.3 90.8 54.9 126.3 10.2 13.1 29 31.7 38.2 37.6 2.4 1.6 4.8 3.4 5.2 4.1.4.7 1.5 1.3 2.2 1.3.8 0 1.5.4 1.5.8 0 1 13.9 7.6 21.4 10.1 4.1 1.5 10.4 1.9 33.1 2.5 15.4.4 28.1.8 28.1.9.1.1.4 13.9.7 30.7.3 16.8.8 32 1.1 33.7.3 1.8.8 4.7 1 6.4 2.1 14.3 11.3 47.3 16.6 59.4.5 1.1 2 4.5 3.3 7.5 5.1 11.7 7.9 17.6 9.8 21 1.1 1.9 2.7 5.2 3.6 7.2.9 2.1 2 3.8 2.5 3.8.4 0 .8.7.8 1.5s.5 1.5 1 1.5c.6 0 1 .5 1 1.1 0 1.9 17.5 26.5 24.5 34.4 7.6 8.6 17.8 18.5 24 23.3 8.9 6.8 14.3 10.6 16.5 11.6 1.4.6 2.7 1.4 3 1.7 2.4 3.2 30.7 12.8 33.1 11.3.4-.2 1 0 1.3.4.3.5 13.3.9 28.8.9h28.3l1.2 4.4c.7 2.4 2 5.8 2.8 7.6.8 1.7 1.5 3.4 1.5 3.7 0 1.3 12 28.6 13 29.6.3.3 1.2 1.8 2 3.3 2.1 4.1 6.7 8.7 10.3 10.2 3.3 1.4 33.7 2.2 33.7.9 0-.3-2.7-3.6-6.1-7.2-15.7-17.2-28.8-38.6-34.3-56.2-8.2-26.2-7.9-21.7-8.5-113-.6-80.7-.6-81.5-2.8-86.8-5.7-14.1-17-20.5-22.7-12.9-2.1 2.8-2.1 3.9-2.6 63.5-.6 68.6-.6 68.2-8.5 84.8-3.6 7.4-5.6 10.2-11.5 15.8-6.7 6.2-7.3 6.6-8.9 5.2-1-.9-2-1.4-2.3-1.1-.3.3-1.1-.1-1.8-1-.7-.8-1.8-1.5-2.5-1.5s-1.8-.7-2.5-1.5-1.6-1.2-2.1-.9c-.5.3-1.2-.2-1.5-1-.3-.9-1.1-1.6-1.6-1.6-.6 0-2.3-1.1-4-2.5-2.5-2.1-4-2.5-9.6-2.5-28.4 0-61.9-26.6-85.6-68-5.8-10.2-11-25.2-14.8-42.5l-2.2-10L216 846l-.5-210.5-2.4-5.8c-2.6-6.7-9.3-14.2-13.4-15.2-4-1-7.4.2-9.4 3.2-1.7 2.5-1.8 11-2.3 138.3l-.5 135.5-2.3 8c-4.2 15.2-13.1 29.3-21.4 34.2-3.3 1.9-3.3 1.9-7.3-.4-2.2-1.2-5.6-3-7.5-4-3.8-1.9-5.1-2.8-7.9-5.6-1.5-1.4-3.7-1.9-9.7-2.1-28.4-1.1-60-25.3-83.3-64-7-11.5-9.7-18-13.7-32.4-6.6-24.4-6.4-17.6-6.4-178.9 0-160.4.3-152.5-6-162.3-4.3-6.6-7.3-9.1-11.8-9.7-3.4-.5-4.5-.1-6.6 2zM960.6 742.9l-15.9.6-2.1 2.8-2.1 2.8-.5 255.7-.5 255.7-2.2 8.1c-4.2 15.6-10 25.6-19.2 33.3l-4.9 4.1-5.3-2.5c-6-2.9-8.7-4.4-10.6-6.2-4-3.6-8.2-5.1-16.3-5.6-4.7-.3-11-1.5-14-2.5-23.8-8.3-47.2-29.2-65.1-58.4-2.9-4.6-5.7-9-6.4-9.8-2.1-2.4-10.1-27.5-12.7-39.5-2.3-11-2.3-11-2.8-117.5-.5-102.2-.6-106.7-2.4-111-6.4-14.9-17.3-21.4-23-13.7l-2.1 2.8-.5 444.7-.5 444.7-2.2 8c-3.7 13.1-8.7 22.1-16.5 29.8-5 5-7.4 6.7-8.6 6.2-.9-.4-2.1-.8-2.7-.9-.5-.1-2.8-1.3-5-2.8-2.2-1.4-5-2.8-6.2-3.2-1.3-.4-2.3-1.1-2.3-1.6s-1.5-1.7-3.2-2.8c-2.4-1.4-5.7-2.1-11.8-2.4-28.9-1.6-60.7-27.8-84.3-69.4-4.9-8.7-10.5-25.1-13.9-40.9-2-9.5-2.1-13.4-2.7-78.5l-.6-68.5-3.1-6.6c-7.1-14.9-17.9-19.4-22.9-9.4-1.9 3.8-2 6.2-2.2 62.4-.2 32.1 0 58.8.4 59.3.3.6.7 3.4.8 6.2.1 2.8.5 7.1.9 9.6.3 2.5.8 6.3 1.1 8.5.4 4.1 3.7 19.6 5.6 26.9 10 38.2 29.1 76.6 52.6 105.9 7.9 9.9 25.2 27 31.4 31.2 2.4 1.6 4.8 3.6 5.2 4.2.4.7 1.4 1.3 2.1 1.3.7 0 2.1.9 3.1 2 .9 1 2 1.9 2.4 1.8 1.6-.2 2.9.3 4.7 2 2.6 2.4 8.5 5 18.9 8.4 11 3.6 11.5 3.6 45 3.8 24 .1 27.9-.2 34.8-1.9 11-2.9 17.1-6.4 25.7-15.1 11-11 18.6-26.4 22.4-45.7.9-4.3 1.9-9.2 2.3-10.8.4-1.7.9-123.1 1-269.9.2-146.9.5-267.1.7-267.3.2-.2 2.3 1.5 4.7 3.8 2.4 2.3 6.9 6.2 9.9 8.8 3 2.5 6.3 5.4 7.4 6.3 1.1 1 2.8 2 3.8 2.4 1 .3 1.8 1 1.8 1.5s.7.9 1.5.9 1.5.4 1.5 1c0 .5.6 1 1.4 1 .7 0 2.4.8 3.7 1.9 1.3 1 4.9 2.9 7.9 4.2 3 1.2 5.7 2.6 6 3.1.3.4 4.6 1.7 9.5 2.9 8.3 2.1 11.4 2.3 40.5 2.3 34.8.1 36.4-.1 48.5-6.2 16-8.2 28.4-26.2 34.4-50.2 1.6-6.3 3.2-13.5 3.7-16 .4-2.5.9-118.1 1.1-256.9.4-277.3.8-256.8-5.4-268.3-2.6-4.7-7.6-9.9-10.3-10.7-2.4-.7-18.3-.8-35.4-.2z" />
      <Path d="M755.1 800.6c-1.1 1.4-2.3 4-2.6 5.8-.4 1.7-.5 22.9-.3 47.1l.3 44 2.8 6.1c6.3 13.6 17.1 18.8 22.4 10.7 1.7-2.5 1.8-6 1.8-48.3 0-49.4 0-49.1-5.8-58.3-5.7-9.1-14.4-12.4-18.6-7.1zM379.1 859.6c-1.1 1.4-2.3 4.4-2.6 6.7-1.2 8.1 0 104.9 1.3 108.9 1.8 5.4 7.2 12.9 11.2 15.6 4.7 3.1 9.6 2.7 12.4-1.1 2.1-2.8 2.1-3.9 2.4-53.5.3-54.5 0-59-4.6-67.5-5.8-10.8-15.4-15.1-20.1-9.1zM567.8 1029.7c-.8 1-1.9 2.5-2.4 3.3-.5.9-1.1 56.6-1.4 130.5l-.5 129-2.3 8c-3.5 12.4-8.2 21.3-15.1 28.8-3.5 3.6-7.1 6.9-8.2 7.2-1.2.4-4-.6-7.7-2.6-3.1-1.9-5.9-3.2-6.1-3-.2.1-.7-.1-1-.6-.3-.5-2.6-2.3-5.1-4-4-2.7-5.3-3.1-11.5-3.2-13.7 0-32.3-8.2-46.3-20.3-3-2.6-3.9-2.8-11-2.8-4.2 0-8.7.3-9.9.6-3.3.9-6 7.3-5.7 13.3.2 5.2 3.3 14.7 5.9 18.4 2.1 3.1 17.3 18.4 22.4 22.6 2.4 2 4.9 4.1 5.5 4.6 2.2 2.1 10.5 7.5 11.5 7.5.6 0 1.1.4 1.1 1 0 1.6 19.9 10.7 28.5 13.1 10.5 2.9 24.7 3.1 32.7.5 5.3-1.7 6-1.7 12-.2 3.5.9 7.2 1.6 8.1 1.6.9 0 1.7.4 1.7 1 0 .5 0 12.2.1 25.8 0 21 .2 25.7 1.8 30.8 3.3 10.9 7.3 16.9 13.8 20.5 3.7 2.1 8.6.8 11-2.8 1.7-2.6 1.8-13.9 2.1-202.2.1-130.5-.1-201.4-.8-205.1-1.4-8-5.8-15.8-10.8-19.7-4.9-3.7-10-4.4-12.4-1.6zM570 1475.3c-1.4.7-3.4 3-4.5 5.2-1.8 3.7-2 6.3-2.3 31.4-.2 22.9 0 28.5 1.4 34 4.9 19.8 18.2 30 25.1 19.4 1.6-2.5 1.8-5.6 1.8-35.8 0-31.9-.1-33.2-2.3-38.6-2.7-6.8-8.4-13.7-12.9-15.5-3.9-1.7-3.2-1.7-6.3-.1zM1204.5 1923.7c-2.8 1-12.7 6.2-22 11.6-61.5 35.3-88.8 51.3-88.7 52.2 0 .5 65.7 38.9 145.9 85.2l145.8 84.1.3 13.1c.1 7.9.7 13.1 1.3 13.1.5 0 24.5-13.5 53.2-30.1 34.7-20 53.5-31.4 56-33.9l3.7-3.9v-16.5c0-9.1-.4-17.5-.9-18.8-.5-1.3-2.4-3.8-4.2-5.6-3.8-3.7-250.5-146.5-258.3-149.5-7.5-2.9-25.3-3.4-32.1-1zM912.4 2091.2c-28.5 16.5-53.4 31.1-55.1 32.4-5.3 4-5.6 5.3-5.5 23.6 0 19.2.3 20.1 8.2 26 4.2 3.2 235.1 136.9 247 143 9 4.7 15.5 6.2 26.5 6.2 7.6 0 11.2-.5 15-2 2.8-1.1 28.8-15.7 57.8-32.5l52.7-30.4-.2-13.4-.3-13.4-143.5-82.9c-78.9-45.6-145.1-83.8-147.1-84.8l-3.5-1.8-52 30zM785 2168.1c-3 .4-6.7 1.2-8.2 1.8-1.5.5-62.4 35.5-135.5 77.7-73 42.2-146.1 84.3-162.3 93.7-45.5 26.2-47.3 27.3-50.3 30.5l-2.8 3-.1 17c0 19.3.5 20.9 7.4 26.5 5.5 4.4 246.4 143.3 254.3 146.6 5.4 2.3 7.4 2.6 19 2.6 11.9 0 13.4-.2 18.5-2.6 3-1.4 54.8-31.1 115-65.9 60.2-34.7 135.8-78.3 167.9-96.8 32.1-18.6 60.1-35.3 62.3-37.3l3.8-3.6v-17.4c0-19.4-.5-21.2-7.2-26.2-7.9-5.9-250.8-145.2-256.8-147.3-7.4-2.5-16.9-3.4-25-2.3zm-63.7 155.5c15.6 1.9 33.6 7.2 44.7 12.9 2.5 1.3 5.2 2.6 6 2.9 4.9 2.1 11 6.7 10.3 7.9-.4.6-.1.7.6.3 1.3-.8 5.4 2.2 4.6 3.4-.2.4 1.7 2.7 4.3 5.1l4.7 4.4-4.5-4.8c-2.4-2.6-3.9-4.7-3.3-4.7.9 0 3.2 2.3 11.3 11.5 2 2.3 6.5 10.7 6.2 11.7-.1.4.3 3.2.9 6.3 1.2 6.4-.6 15.4-4.4 21.4-2.8 4.6-8.6 11.1-9.9 11.1-.5 0 1-2.2 3.5-5 4.3-4.8 8.8-12.6 8.6-15.2 0-.7-.7.5-1.6 2.7-2 4.9-6.2 11.2-9.7 14.4-1.4 1.3-2.3 2.7-2.1 3.1.3.4-.9 1.8-2.6 3.1-1.7 1.3-4 3.1-4.9 4.1-1 .9-2.1 1.4-2.3 1.1-.3-.2-1.8.2-3.4 1-5.5 2.8-18 6.5-27.8 8.2-10.8 1.9-32.5 2.4-43.7 1.1-5.7-.6-6.8-1.1-6.8-2.6 0-2.5.3-2.7 15.4-8.6l13-5.1-9-.7-8.9-.8-5.3 5.7c-2.9 3.1-5.5 7-5.9 8.6-.3 1.6-.9 2.9-1.4 2.9-2.6 0 .8-6.7 6.9-13.4l4.6-5.1-4.6 4.4c-2.6 2.4-5.7 6.4-7 8.7-2.4 4.5-5.3 5.8-6.5 2.8-.5-1.3-.7-1.3-1.4-.2-.7 1-.9.8-.9-.6 0-1.5-.3-1.6-1.5-.6-1.1.9-3.4.6-11.5-2-11.7-3.6-23-8.7-23-10.4 0-2.8 3.1-4.7 13.5-8.2 6.1-2 11.6-3.7 12.3-3.7 1.7 0 .7-.9-5.9-4.6l-5.7-3.1-6.2 6.7c-3.4 3.6-7.1 8.5-8.1 10.7-1.2 2.6-1.9 3.4-1.9 2.1 0-2.8 2.7-7 9.5-14.5 5.6-6.4 5.6-6.4-1.2.7-3.9 3.9-7.6 8.5-8.2 10.2-1.2 2.7-1.5 2.9-3.9 1.8-1.5-.6-2.8-1.2-3-1.3-1.7-1.1 11.6-18.4 14.1-18.4.6 0-.7 1.9-3 4.2-4.6 4.8-9.3 11.5-9.3 13.2.1.6.9-.5 2-2.5 1-1.9 4-5.9 6.6-8.8 2.7-3 4.9-6.3 5.1-7.5.2-1.1 0-1.6-.4-1.1-.5.6-2.1 2.1-3.7 3.3-4 3.1-16.4 3.2-19.1.2-1-1.1-2-1.8-2.3-1.5-.3.3-1.2-.1-2.1-.7-1.4-1-1.4-1-.3.2.7.8 1.7 1.5 2.1 1.5 1 0 12.1 10.1 12.1 11 0 .4-.8.1-1.7-.6-1.5-1.1-1.6-1.1-.5.1 1.4 1.6 1.5 3 .3 4.9-.8 1.2-1.8.8-5.5-2.3-2.6-2.1-4.4-4.1-4.2-4.5.3-.4-1.3-2.5-3.6-4.7-2.2-2.1-3.8-3.3-3.4-2.7.4.7.5 1.3.2 1.3-1.1 0-8.7-10.9-9.1-13-.2-1.3-1-3.9-1.6-5.8-2-6-.6-16 3.1-23.1 3.3-6.2 11.1-14.2 18-18.6 7.8-4.9 27.5-11 41.5-12.8 7.8-1 30.9-.5 41.8.9z" />
      <Path d="M697.8 2326.5c-.3.4-3.7.9-7.5 1.1-9.8.7-21.5 3.1-31.2 6.4-4.6 1.6-9.1 2.6-10 2.3-3-1.1-.6.5 7.3 5.1l7.9 4.4-3.3 2-3.2 2-8.2-4.8c-5.9-3.5-8.4-4.5-9.4-3.8-.7.6-1 1.3-.7 1.6.2.3-2 3.1-4.9 6.3-5.1 5.4-8.6 12.5-8.6 17.1 0 1-.7 2.1-1.5 2.4-.8.4-1.5 1.6-1.4 2.8v2.1l1-2.1c.6-1.1 2.3-2.7 3.7-3.6 1.5-.8 18.2-10.4 37-21.3 32.9-18.9 34.5-19.7 37-18.4 1.5.7 3 1.5 3.4 1.7.4.1.5-.4.2-1.2-.3-.9-1.1-1.6-1.8-1.6-.6 0-2-.3-3.1-.6s-2.3-.2-2.7.1z" />
      <Path d="M663.8 2348.9c-19.7 11.3-35.8 20.9-35.8 21.2 0 .8 56.3 33.3 62.5 36 29 12.8 69.6 8.3 81.2-9.2 3.7-5.6 4.3-13.3 1.4-19.2-3.9-8.1-10.9-13.3-41.1-30.7-15.7-9-29.4-16.9-30.5-17.6-1.8-1-6.1 1.2-37.7 19.5zm57.9 9.2c24.5 14.1 27 15.9 29.5 21.6 2.3 5.2 1.9 7.8-1.8 12.3-7.3 8.6-26.4 11.4-42.1 6.1-4.5-1.5-48.7-26.1-48-26.7.5-.5 42.2-24.4 42.6-24.4.2 0 9.1 5 19.8 11.1zM728.5 2336l-4.7 4.7 4.9 2.8c9.7 5.6 11.8 6.6 9.9 5.1-2.2-1.8-2.4-1.7 10.4-5.7 4.1-1.2 7.9-2.6 8.3-2.9.9-.8-8-4.4-17.4-7l-6.7-1.8-4.7 4.8zM765.5 2344.7c-1.1.3-6.2 1.8-11.3 3.5-5.4 1.7-10.2 2.7-11.5 2.3-1.2-.3-.2.7 2.3 2.2 8.9 5.7 14 8.3 13.5 7.1-.3-.7 2.4-3.9 6-7.2 3.7-3.2 6.3-6.1 6-6.4-.3-.3-1.9 1.1-3.6 3.1-1.7 2-4 4.2-5.2 4.9-1.2.6-.1-1.1 2.6-4 5.9-6.4 5.9-6.6 1.2-5.5zM772.4 2350.7c-1.6 2-5 5.3-7.6 7.4l-4.7 3.7 2.4 1.6c1.8 1.2 2.4 1.3 2.3.4-.2-1 2.7-1.4 12-1.8l12.3-.5-5-4.9c-2.8-2.7-4.7-5.4-4.4-5.9.3-.6.1-.7-.5-.4-1.6 1.1-4.4-.4-3.8-1.9.8-2.2.2-1.7-3 2.3z" />
      <Path d="M796.4 2379.2c.3 1.1-1.5 3.5-5.8 7.5-5.9 5.5-17.6 14.3-19.3 14.5-.4 0-2.4 1.4-4.3 3-1.9 1.7-2.6 2.6-1.6 2 1.5-.8 3.4-.1 9.3 3.5 7.1 4.4 7.5 4.5 9.4 2.7 1-.9 1.7-1.9 1.4-2.2-.2-.3 1.4-2.5 3.7-5.1 2.2-2.5 5-6.5 6-8.9 2.5-5.6 3.5-14.3 1.9-16.8-1-1.5-1.1-1.5-.7-.2zM685 2407c-.8.5-5.7 2.4-10.9 4.1-6.7 2.3-9 3.4-7.9 4 .9.5 6.2 2.4 11.9 4.3 5.7 2 10.5 4 10.7 4.6.2.6 1.6-.7 3.2-2.7 1.5-2.1 4.2-5.2 6-6.8 2.4-2.2 1.9-1.2-1.8 3.5-2.9 3.6-5.2 6.9-5.2 7.4s1.3-.9 2.8-3c1.6-2.1 4.2-5.3 5.9-7.1l3-3.2-6.6-2.4c-3.6-1.3-7.3-2.7-8.1-3-.8-.4-2.2-.2-3 .3zM750.5 2413c-10.3 5.1-27.1 12-29.2 12-.6 0-1.5.5-1.9 1.2-.5.8 2.1 1 10.7.5 13.5-.8 27.1-3.5 35.8-7 3.5-1.4 7.1-2.3 8-2 2.7 1 .9-.3-5.9-4.3-3.6-2-6.7-4.1-7-4.5-.3-.4-5 1.4-10.5 4.1zM357.9 2414c-2.5.4-6.4 1.6-8.7 2.6-5.3 2.5-108.1 61.7-108.1 62.4 0 .3 66 38.6 146.7 85.1l146.7 84.6.5 13.1.5 13 53.1-30.6c29.3-16.9 54.2-31.6 55.4-32.7 4.1-3.6 5-7.6 5-21.7 0-16.3-.8-19.5-6.3-24.5-2.4-2.2-55.1-33.2-122.7-72.3-126.7-73.1-132.4-76.3-138.5-77.9-5.9-1.5-18.3-2.1-23.6-1.1zM59 2583.6c-32.4 18.8-53.7 31.8-55.8 33.9L0 2621v16.6c0 19.3.7 21.5 7.9 26.8 4.4 3.2 240.9 140 249.8 144.5 10.7 5.4 28.6 6.8 38.5 3.1 2.9-1.1 28.9-15.7 57.8-32.3l52.5-30.4.3-13.4.2-13.4-146.8-84.8c-80.8-46.6-147.3-84.7-147.8-84.6-.5.1-24.5 13.8-53.4 30.5z" />
    </Svg>
  );
}

const SvgDoctor1 = React.memo(SvgComponent);
export default SvgDoctor1;
