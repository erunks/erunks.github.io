import { any, shape, string } from 'prop-types';

const workExperience = {
  altLogo: shape({
    url: string,
  }),
  description: any.isRequired,
  endDate: string,
  location: string.isRequired,
  logo: shape({
    url: string,
  }).isRequired,
  name: string.isRequired,
  position: string.isRequired,
  startDate: string.isRequired,
};

export default workExperience;
