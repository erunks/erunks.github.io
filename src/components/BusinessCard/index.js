import { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import VanillaTilt from 'vanilla-tilt';
import { handleKeyUp, transformStyleToMap } from 'lib/helpers';
import styles from './BusinessCard.module.scss';

const BusinessCard = () => {
  const [showFront, setShowFront] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const businessCard = useRef(null);

  useEffect(() => {
    if(businessCard.current) {
      VanillaTilt.init(businessCard.current, {
        max: 15,
        reverse: true,
        scale: 1.05,
        speed: 500,
      });
    }
  }, [businessCard]);

  const front = (
    <div className="front">
      <h1>Front</h1>
    </div>
  );

  const back = (
    <div className="back">
      <h1>Back</h1>
    </div>
  );

  const renderSide = () => (showFront ? front : back);

  const flipCard = async () => {
    setFlipping(true);
    const currentTilt = businessCard.current.style.transform;
    const transformMap = transformStyleToMap(currentTilt)
    businessCard.current.style.transform = `${currentTilt} rotate3d(0, 1, 0, ${-90 - transformMap?.rotateY.value}deg)`;
    await new Promise(resolve => setTimeout(resolve, 500));
    setFlipping(false);
    businessCard.current.style.transform = currentTilt;
    setShowFront(!showFront);
  };

  return (
    <div className={styles.business_card_container}>
      <div
        className={classnames(
          'business_card',
          styles.business_card_body,
        )}
        onClick={flipCard}
        onKeyUp={(e) => handleKeyUp(e, flipCard)}
        ref={businessCard}
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

export default BusinessCard;
