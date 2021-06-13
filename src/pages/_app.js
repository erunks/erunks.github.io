import { any, elementType } from 'prop-types';
import MainLayout from 'layouts/MainLayout';
import find from 'lodash/find';
import { useRouter } from 'next/router';
import 'styles/globals.scss';

const links = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/contact',
    text: 'Contact',
  },
];

const App = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const activeLink = find(links, ['href', pathname]);

  return (
    <MainLayout links={links} title={activeLink.text}>
      <Component {...pageProps} />
    </MainLayout>
  );
};

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  Component: elementType.isRequired,
  pageProps: any,
};

App.defaultProps = {
  pageProps: {},
};

export default App;
