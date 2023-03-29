import { Props } from '@/components/atoms/View/types';
import Image from 'next/image';
import { FC } from 'react';
import { StyledHeader, StyledLogo } from './style';

export const Header: FC<Omit<Props, 'children'>> = (props) => {
  return (
    <StyledHeader {...props}>
      <StyledLogo>
        <Image
          loading="eager"
          priority
          src={'/logo.png'}
          alt="logo"
          layout={'fill'}
          objectFit={'contain'}
        />
      </StyledLogo>
    </StyledHeader>
  );
};
