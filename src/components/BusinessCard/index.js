import { useEffect, useState, useRef } from 'react';
import { businessCard } from 'prop_types';
import classnames from 'classnames';
import join from 'lodash/join';
import { handleKeyUp, transformStyleToMap } from 'lib/helpers';
import Image from 'next/image';
import VanillaTilt from 'vanilla-tilt';
import styles from './BusinessCard.module.scss';

const BusinessCard = ({
  firstname,
  middlenames,
  lastname,
  organization,
  jobTitle,
  logo,
  emails,
  phoneNumbers,
  socialUrls,
}) => {
  const [showFront, setShowFront] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const businessCardRef = useRef(null);

  useEffect(() => {
    if (businessCardRef.current) {
      VanillaTilt.init(businessCardRef.current, {
        max: 15,
        reverse: true,
        scale: 1.05,
        speed: 500,
      });
    }
  }, [businessCardRef]);

  const fullName = join([firstname, middlenames, lastname], ' ');

  const front = (
    <div
      className={classnames(
        styles.business_card__side,
        styles.business_card__front
      )}
    >
      <div>
        <h1>{fullName}</h1>
        <hr />
      </div>
    </div>
  );

  const back = (
    <div
      className={classnames(
        styles.business_card__side,
        styles.business_card__back
      )}
    >
      <div className={styles.business_card__back__header}>
        <div className={styles.logo}>
          <Image
            alt={`${fullName} Logo`}
            className={styles.logo_image}
            height="auto"
            loading="lazy"
            objectFit="contain"
            src={logo.url}
            title={`${fullName} Logo`}
            width="auto"
          />
        </div>
        <div>
          <h2>{fullName}</h2>
          <hr />
          <h3>{`${jobTitle} - ${organization}`}</h3>
        </div>
      </div>
      <div className={styles.business_card__back__footer}>
        <ul>
          <li>{`P: ${phoneNumbers.cellPhone}`}</li>
          <li>{`E: ${emails.workEmail}`}</li>
          <li>{`W: ${socialUrls.linkedIn}`}</li>
        </ul>
      </div>
    </div>
  );

  const renderSide = () => (showFront ? front : back);

  const flipCard = async () => {
    setFlipping(true);
    const currentTilt = businessCardRef.current.style.transform;
    const transformMap = transformStyleToMap(currentTilt);
    businessCardRef.current.style.transform = `${currentTilt} rotate3d(0, 1, 0, ${
      -90 - transformMap?.rotateY.value
    }deg)`;
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFlipping(false);
    businessCardRef.current.style.transform = currentTilt;
    setShowFront(!showFront);
  };

  return (
    <div className={styles.business_card_container}>
      <div
        className={classnames('business_card', styles.business_card_body)}
        onClick={flipCard}
        onKeyUp={(e) => handleKeyUp(e, flipCard)}
        ref={businessCardRef}
        role="button"
        tabIndex={0}
        data-tilt
      >
        <div className={styles.business_card__drop_shadow} />
        {!flipping && renderSide()}
      </div>
    </div>
  );
};

BusinessCard.propTypes = {
  ...businessCard,
};

export default BusinessCard;
