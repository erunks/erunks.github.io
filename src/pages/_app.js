import { any, arrayOf, elementType } from 'prop-types';
import { socialLink } from 'prop_types';
import MainLayout from 'layouts/MainLayout';
import { getAllSocialLinks } from 'lib';
import find from 'lodash/find';
import App from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

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

const MyApp = ({ Component, pageProps, socialLinks }) => {
  const { pathname } = useRouter();
  const activeLink = find(links, ['href', pathname]);

  return (
    <RecoilRoot>
      <MainLayout
        links={links}
        socialLinks={socialLinks}
        title={activeLink.text}
      >
        <Component {...pageProps} />
      </MainLayout>
    </RecoilRoot>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const socialLinks = await getAllSocialLinks({ order: 'name_ASC' });

  return {
    socialLinks,
    ...appProps
  };
};

/* eslint-disable react/forbid-prop-types */
MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: any,
  socialLinks: arrayOf(socialLink).isRequired,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
