import { any, elementType } from 'prop-types';
import App from 'next/app';
import { RecoilRoot } from 'recoil';

import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: any /* eslint-disable-line react/forbid-prop-types */,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
