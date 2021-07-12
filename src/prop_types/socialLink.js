import { shape, string } from 'prop-types';

const socialLink = {
  icon: shape({
    url: string,
  }).isRequired,
  name: string.isRequired,
  url: string.isRequired,
};

export default socialLink;
