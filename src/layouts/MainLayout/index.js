import { useEffect, useState } from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import { sideNavLink, socialLink } from 'prop_types';
import classnames from 'classnames';
import SideNav from 'components/SideNav';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { socialState } from 'recoils';

import styles from './MainLayout.module.scss';

const MainLayout = ({ children, links, socialLinks, title }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [socials, setSocials] = useRecoilState(socialState);

  useEffect(() => {
    if (isEmpty(socials)) {
      setSocials(socialLinks);
    }
  }, [socials]);

  return (
    <div
      className={classnames(styles.container, 'layout', {
        'light-mode': !darkMode,
      })}
    >
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideNav links={links} />
      <section>
        <header className={styles.header}>
          Header
          <button onClick={toggleDarkMode} type="button">
            Toggle
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.main_content}>{children}</section>
        </main>
        <footer className={styles.footer}>
          {map(socials, ({name, url}) => (
            <div key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            </div>
          ))}
        </footer>
      </section>
    </div>
  );
};

MainLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  links: arrayOf(sideNavLink).isRequired,
  socialLinks: arrayOf(socialLink).isRequired,
  title: string.isRequired,
};

export default MainLayout;
