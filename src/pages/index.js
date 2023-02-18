import { shape } from 'prop-types';
import { businessCard } from 'prop_types';
import BusinessCard from 'components/BusinessCard';
import { getAllBusinessCards } from 'lib';
import Head from 'next/head';

const Card = ({ card }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <BusinessCard {...card} />
  </>
);

export const getStaticProps = async () => {
  const businessCards = await getAllBusinessCards();

  return {
    props: { card: businessCards[0] },
  };
};

Card.propTypes = {
  card: shape(businessCard).isRequired,
};

export default Card;
