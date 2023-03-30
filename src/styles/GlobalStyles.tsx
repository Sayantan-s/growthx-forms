import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './theme';

const inter = Inter({ subsets: ['latin'] });

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: ${inter.style.fontFamily};
    }

    html{
        font-size: 62.5%;
         @media (max-width: ${breakpoints.tab}) {
            font-size: 50%;
        }
    }

    body{
        font-size: ${({ theme }) => theme.fontSize['2']};
        height: 100vh;
        color: ${({ theme }) => theme.colors.black[50]};
        font-weight:  ${({ theme }) => theme.fontWeights.thin};
        overflow: hidden;
        position:fixed;
        width: 100%;
    }

    #__next{
        height: inherit;
    }
`;
