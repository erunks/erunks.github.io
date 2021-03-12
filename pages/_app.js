import { any, elementType } from 'prop-types';
import '../styles/globals.scss';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

App.propTypes = {
  Component: elementType.isRequired,
  pageProps: any,
};

App.defaultProps = {
  pageProps: {},
};

export default App;
