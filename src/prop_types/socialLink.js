import { shape, string } from 'prop-types';

const socialLink = shape({
  icon: shape({
    url: string,
  }),
  name: string,
  url: string,
});

export default socialLink;
