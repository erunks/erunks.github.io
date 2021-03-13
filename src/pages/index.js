import { arrayOf, shape, string } from 'prop-types';
import map from 'lodash/map';
import Head from 'next/head';
import Link from 'next/link';
import { getAllSocialLinks } from '../lib/index';
import styles from '../styles/Home.module.scss';

const Home = ({ socials }) => (
  <div className={styles.container}>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
      Header
      <nav>
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/contact">
          Contact
        </Link>
      </nav>
    </header>

    <main className={`${styles.main} main__index`}>
      {map(socials, (item) => (
        <div key={item.name}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        </div>
      ))}
    </main>

    <footer>Footer</footer>
  </div>
);

export const getStaticProps = async () => {
  const socials = await getAllSocialLinks({ order: 'name_ASC' });

  return {
    props: { socials },
  };
};

Home.propTypes = {
  socials: arrayOf(
    shape({
      icon: shape({
        url: string,
      }),
      name: string,
      url: string,
    })
  ).isRequired,
};

export default Home;
