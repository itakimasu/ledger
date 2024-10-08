import type { AppType } from 'next/app';
import { trpc } from '@/utils/hooks';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);