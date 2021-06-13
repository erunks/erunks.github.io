import { useState } from 'react';
import { arrayOf, node, oneOfType, shape, string } from 'prop-types';
import { sideNavLink } from 'prop_types';
import classnames from 'classnames';
import SideNav from 'components/SideNav';
import Head from 'next/head';

import styles from './MainLayout.module.scss';

const MainLayout = ({ children, links, title }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        <footer className={styles.footer}>Footer</footer>
      </section>
    </div>
  );
};

MainLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  links: arrayOf(shape(sideNavLink)).isRequired,
  title: string.isRequired,
};

export default MainLayout;
