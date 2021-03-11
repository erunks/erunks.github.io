import { arrayOf, shape, string } from 'prop-types';
import map from 'lodash/map';
import Head from 'next/head';
import { getAllSocialLinks } from '../lib/index';
import styles from '../styles/Home.module.css';

const Home = ({ socials }) => (
  <div className={ styles.container }>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={ styles.main }>
      {map(socials, (item) => (
        <div key={ item.name }>
          <a
            href={ item.url }
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.name}
          </a>
        </div>
      ))}
    </main>
  </div>
);

export const getStaticProps = async () => {
  const socials = await getAllSocialLinks();

  return {
    props: { socials },
  };
};

Home.propTypes = {
  socials: arrayOf(shape({
    icon: shape({
      url: string,
    }),
    name: string,
    url: string,
  })).isRequired,
};

export default Home;
