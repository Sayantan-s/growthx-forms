import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  Bar,
  Container,
  Progress,
  StyledLogo,
  StyledView,
  ViewOverLay,
} from './style';

export const Overlay: FC = () => {
  const timerRef = useRef<NodeJS.Timeout>(
    null
  ) as MutableRefObject<NodeJS.Timeout>;

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setToggle(false);
    }, 1500);
  }, []);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {toggle ? (
        <ViewOverLay
          type="stack"
          animate={{ y: 0 }}
          exit={{ y: '-10vh', opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <StyledView>
            <StyledLogo
              initial={{ opacity: 0, y: '1rem', visibility: 'visible' }}
              animate={{ opacity: 1, y: '0' }}
              transition={{ duration: 0.6 }}
            >
              <Image
                loading="eager"
                priority
                src={'/logo.png'}
                alt="logo"
                layout={'fill'}
                objectFit={'contain'}
              />
            </StyledLogo>
            <Container>
              <Bar />
              <Progress
                initial={{ translateX: -100 }}
                animate={{ translateX: [0, 210] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </Container>
          </StyledView>
        </ViewOverLay>
      ) : null}
    </AnimatePresence>
  );
};

Overlay.displayName = 'Form.Entries.Overlay';
