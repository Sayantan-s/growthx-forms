import {
  TouchEventHandler,
  WheelEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ScrollDirection = 'upward' | 'downward' | false;

export const useWheelScroll = (): [
  boolean,
  ScrollDirection,
  WheelEventHandler<HTMLElement>,
  TouchEventHandler<HTMLElement>,
  TouchEventHandler<HTMLElement>,
  () => void
] => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrolling, setIsScrolling] = useState<ScrollDirection>(false);
  const [touchStart, setTouchStart] = useState(0);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    setTouchStart(event.touches[0].clientY);
  };

  const handleTouchMove: TouchEventHandler<HTMLElement> = (event) => {
    const { touches } = event;
    const deltaY = touchStart - touches[0].clientY;
    setScrollPosition((prevScrollPosition) => prevScrollPosition + deltaY);
    setIsScrolling(deltaY > 0 ? 'downward' : 'upward');
  };

  const handleWheel: WheelEventHandler<HTMLElement> = (event) => {
    const { deltaY } = event;
    setScrollPosition((prevScrollPosition) => prevScrollPosition + deltaY);
    setIsScrolling(deltaY > 0 ? 'downward' : 'upward');
    clearTimeout(scrollTimeout?.current as NodeJS.Timeout);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 50);
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
  };

  const initiallyIdle = useMemo(() => {
    return scrollPosition === 0 && scrolling === false;
  }, [scrollPosition, scrolling]);

  return [
    initiallyIdle,
    scrolling,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ];
};
