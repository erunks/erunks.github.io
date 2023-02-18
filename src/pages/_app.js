import { any, elementType } from 'prop-types';
import { RecoilRoot } from 'recoil';

import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </>
);

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: any /* eslint-disable-line react/forbid-prop-types */,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
