import { socialLink } from 'prop_types';
import Image from 'next/image';

import styles from './Social.module.scss';

const Social = ({ icon, name, url }) => (
  <div className={styles.social}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Image
        alt={`${name} Icon`}
        className={styles.icon}
        height={36}
        loading="lazy"
        objectFit="contain"
        src={icon.url}
        title={`${name} Icon`}
        width={36}
      />
    </a>
  </div>
);

Social.propTypes = {
  ...socialLink,
};

export default Social;
