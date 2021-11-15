import { useState, useRef } from 'react';
import { businessCard } from 'prop_types';
import axios from 'axios';
import classnames from 'classnames';
import Overlay from 'components/Overlay';
import useMeetsScreenRequirements from 'hooks/useMeetsScreenRequirements';
import join from 'lodash/join';
import split from 'lodash/split';
import { downloadFile, handleKeyUp } from 'lib/helpers';
import Image from 'next/image';
import styles from './BusinessCard.module.scss';

const BusinessCard = (businessCardInfo) => {
  const {
    firstname,
    middlenames,
    lastname,
    organization,
    jobTitle,
    logo,
    emails,
    socialUrls,
  } = businessCardInfo;

  const [showFront, setShowFront] = useState(true);
  const businessCardRef = useRef(null);
  const { widthMet } = useMeetsScreenRequirements({ width: 500 });

  const fullName = join([firstname, middlenames, lastname], ' ');
  const jobDetails = join([jobTitle, organization], ' - ');

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
        {logo?.url && (
          <div className={styles.logo}>
            <Image
              alt={`${fullName} Logo`}
              layout="fill"
              loading="lazy"
              objectFit="contain"
              src={logo.url}
              title={`${fullName} Logo`}
            />
          </div>
        )}
        <div>
          <h2>{fullName}</h2>
          <hr />
          <h3>{jobDetails}</h3>
        </div>
      </div>
      <div className={styles.business_card__back__footer}>
        <ul>
          <li>{`E: ${emails.workEmail}`}</li>
          <li>{`G: ${socialUrls.github}`}</li>
          <li>{`W: ${socialUrls.linkedIn}`}</li>
        </ul>
      </div>
    </div>
  );

  const flipCard = () => setShowFront(!showFront);
  const downloadCard = async () => {
    await axios
      .post(`${window.location.origin}/api/vcf`, { info: businessCardInfo })
      .then(
        ({ data, headers }) => {
          const contentDisposition = headers['content-disposition'];
          const contentType = headers['content-type'];
          const filename = JSON.parse(
            split(contentDisposition, 'filename=').pop()
          );

          downloadFile(filename, contentType, encodeURIComponent(data));
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <>
      {!widthMet && (
        <Overlay>
          <h1>Please rotate your screen for the best viewing experience.</h1>
        </Overlay>
      )}
      <div className={styles.business_card_container}>
        <div
          className={classnames('business_card', styles.business_card_body, {
            [styles.business_card__flipped]: !showFront,
          })}
          onClick={flipCard}
          onKeyUp={(e) => handleKeyUp(e, flipCard)}
          ref={businessCardRef}
          role="button"
          tabIndex={0}
          data-tilt
        >
          {front}
          {back}
        </div>
      </div>
      <button
        className={styles.business_card__download}
        type="button"
        onClick={downloadCard}
      >
        &darr;
      </button>
    </>
  );
};

BusinessCard.propTypes = {
  ...businessCard,
};

export default BusinessCard;
