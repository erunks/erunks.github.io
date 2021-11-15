import { string } from 'prop-types';
import { workExperience } from 'prop_types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

import styles from './WorkExperience.module.scss';

const WorkExperience = ({
  description,
  endDate,
  locale,
  location,
  logo,
  name,
  position,
  startDate,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  };

  const timeRange = endDate
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : `${formatDate(startDate)} - Present`;

  return (
    <div className={styles.workExperience}>
      <div className={styles.workLogo}>
        <Image
          alt={`${name} Logo`}
          layout="fill"
          loading="lazy"
          objectFit="contain"
          src={logo.url}
          title={`${name} Logo`}
        />
      </div>
      <div className={styles.workPosition}>
        <h2>{position}</h2>
        <h3>{timeRange}</h3>
        <h4>{location}</h4>
      </div>
      <div className={styles.workDescription}>
        {documentToReactComponents(description)}
      </div>
    </div>
  );
};

WorkExperience.propTypes = {
  locale: string,
  ...workExperience,
};

WorkExperience.defaultProps = {
  locale: 'en',
};

export default WorkExperience;
