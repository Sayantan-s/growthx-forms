import { StyledProvider } from '@/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledProvider>
      <Component {...pageProps} />
    </StyledProvider>
  );
}
