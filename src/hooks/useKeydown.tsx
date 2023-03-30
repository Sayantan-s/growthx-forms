import { useEffect, useState } from 'react';

export const useKeyDown = () => {
  const [keyDown, setKeyDown] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        setKeyDown(true);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        setKeyDown(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return keyDown;
};
