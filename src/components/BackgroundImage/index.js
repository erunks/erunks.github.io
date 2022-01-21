import { string } from 'prop-types';
import useGetScreenDimensions from 'hooks/useGetScreenDimensions';
import Image from 'next/image';

import styles from './BackgroundImage.module.scss';

const BackgroundImage = (imageProps) => {
  const { src } = imageProps;
  const { width, height } = useGetScreenDimensions();

  return (
    <div className={styles.background_image__container}>
      <Image
        {...imageProps}
        loading="lazy"
        src={`${src}?tr=w-${width},h-${height},pr-true,c-at_most,cm-extract,c-maintain_ratio,`}
      />
    </div>
  );
};

BackgroundImage.propTypes = {
  alt: string,
  layout: string,
  src: string.isRequired,
};

BackgroundImage.defaultProps = {
  alt: '',
  layout: 'fill',
};

export default BackgroundImage;
