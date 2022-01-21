import { shape } from 'prop-types';
import { businessCard } from 'prop_types';
import BusinessCard from 'components/BusinessCard';
import { getAllBusinessCards } from 'lib';

const Card = ({ card }) => <BusinessCard {...card} />;

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
