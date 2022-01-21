import { number, string } from 'prop-types';
import Image from 'next/image';

import styles from './ProfileIcon.module.scss';

const ProfileIcon = (imageProps) => (
  <div className={styles.profile_icon__container}>
    <Image {...imageProps} className={styles.profile_icon} />
  </div>
);

ProfileIcon.propTypes = {
  alt: string,
  height: number,
  layout: string,
  src: string.isRequired,
  width: number,
};

ProfileIcon.defaultProps = {
  alt: 'profile icon',
  height: 300,
  layout: 'fixed',
  width: 300,
};

export default ProfileIcon;
