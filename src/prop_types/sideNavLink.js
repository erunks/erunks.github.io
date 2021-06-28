import { shape, string } from 'prop-types';

const sideNavLink = shape({
  href: string.isRequired,
  text: string.isRequired,
});

export default sideNavLink;
