import { arrayOf } from 'prop-types';
import { sideNavLink } from 'prop_types';
import map from 'lodash/map';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './SideNav.module.scss';

const SideNav = ({ links }) => {
  const { pathname } = useRouter();

  const link = ({ href, text }) =>
    pathname === href ? (
      <li key={text}>
        <strong>
          <Link href={href}>{text}</Link>
        </strong>
      </li>
    ) : (
      <li key={text}>
        <Link href={href}>{text}</Link>
      </li>
    );

  return (
    <div className={styles.side_nav}>
      <nav>
        <h1> Naviagtion </h1>
        <ul>{map(links, (linkProps) => link(linkProps))}</ul>
      </nav>
    </div>
  );
};

SideNav.propTypes = {
  links: arrayOf(sideNavLink).isRequired,
};

export default SideNav;
