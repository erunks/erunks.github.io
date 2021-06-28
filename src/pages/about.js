import { useEffect } from 'react';
import { arrayOf, shape } from 'prop-types';
import { workExperience } from 'prop_types';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import WorkExperience from 'components/WorkExperience';
import { getAllWorkExperiences } from 'lib';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import set from 'lodash/set';
import { useRecoilState } from 'recoil';
import { workExperienceState } from 'recoils';

import styles from 'components/WorkExperience/WorkExperience.module.scss';

const About = ({ work }) => {
  const [workExperiences, setWorkExperiences] = useRecoilState(
    workExperienceState
  );

  useEffect(() => {
    if (isEmpty(workExperiences)) {
      setWorkExperiences(work);
    }
  }, [setWorkExperiences, work, workExperiences]);

  return map(workExperiences, (workInfo) => (
    <div className={styles.work} key={workInfo.name}>
      <WorkExperience {...workInfo} />
    </div>
  ));
};

export const getStaticProps = async () => {
  const workExperiences = await getAllWorkExperiences({
    order: 'startDate_DESC',
  });
  const workPromises = map(workExperiences, async (workExp) => {
    const richDescription = await richTextFromMarkdown(workExp.description);
    return set(workExp, `description`, richDescription);
  });

  await Promise.all(workPromises);

  return {
    props: { work: workExperiences },
  };
};

About.propTypes = {
  work: arrayOf(shape(workExperience)).isRequired,
};

export default About;
