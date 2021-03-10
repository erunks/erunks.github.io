import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllSocialLinks } from '../lib/index.js';
import map from 'lodash/map';

const Home = ({ socials }) => (
  <div className={styles.container}>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      {map(socials, item => {
        return (
          <div key={item.name}>
            <a 
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.name}
            </a>
          </div>
        );
      })}
    </main>
  </div>
);

export const getStaticProps = async () => {
  const socials = await getAllSocialLinks();

  return {
    props: { socials }
  };
};

export default Home;
