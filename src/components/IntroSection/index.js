import ProfileIcon from 'components/ProfileIcon';

import styles from './IntroSection.module.scss';

const IntroSection = () => (
  <section className={styles.intro_section__container}>
    <div className={styles.intro_section__content}>
      <h1 className={styles.intro_section__title}>Hi, I&apos;m Eddie</h1>
      <p className={styles.intro_section__description}>
        I&apos;m a software engineer, with a focus on front-end development.
      </p>
    </div>
    <div className={styles.intro_section__profile_icon_container}>
      <ProfileIcon
        src="https://ik.imagekit.io/ozcerk4wii/assets/headshot?tr=w-3168,h-3168,fo-custom"
        alt="headshot"
      />
    </div>
  </section>
);

export default IntroSection;
