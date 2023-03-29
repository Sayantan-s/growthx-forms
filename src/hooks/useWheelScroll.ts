import { TouchEventHandler, WheelEventHandler, useRef, useState } from 'react';

export type ScrollDirection = 'upward' | 'downward' | false;

export const useWheelScroll = (): [
  number,
  ScrollDirection,
  WheelEventHandler<HTMLElement>,
  TouchEventHandler<HTMLElement>,
  TouchEventHandler<HTMLElement>,
  () => void
] => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrolling, setIsScrolling] = useState<ScrollDirection>(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    const { touches } = event;
    // console.log(touches);
    const deltaY = touches[0].clientY - touches[0].pageY;
    setIsScrolling(deltaY > 0 ? 'downward' : 'upward');
    clearTimeout(scrollTimeout.current as NodeJS.Timeout);
  };

  const handleTouchMove: TouchEventHandler<HTMLElement> = (event) => {
    const { touches } = event;
    console.log(touches[0]);
    const deltaY = touches[0].clientY - touches[0].pageY;
    setScrollPosition((prevScrollPosition) => prevScrollPosition + deltaY);
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
    scrollTimeout.current = setTimeout(() => setScrollPosition(0), 50);
  };

  const handleWheel: WheelEventHandler<HTMLElement> = (event) => {
    const { deltaY } = event;
    setScrollPosition((prevScrollPosition) => prevScrollPosition + deltaY);
    setIsScrolling(deltaY > 0 ? 'downward' : 'upward');
    clearTimeout(scrollTimeout?.current as NodeJS.Timeout);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 50);
  };

  return [
    scrollPosition,
    scrolling,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ];
};
