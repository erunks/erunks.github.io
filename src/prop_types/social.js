import { shape, string } from 'prop-types';

const social = shape({
  icon: shape({
    url: string,
  }),
  name: string,
  url: string,
});

export default social;
