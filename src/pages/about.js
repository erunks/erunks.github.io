import { arrayOf, shape } from 'prop-types';
import { workExperience } from 'prop_types';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import WorkExperience from 'components/WorkExperience';
import { getAllWorkExperiences } from 'lib';
import map from 'lodash/map';
import set from 'lodash/set';

import { work } from 'components/WorkExperience/WorkExperience.module.scss';

const About = ({ workExperiences }) =>
  map(workExperiences, (workInfo) => (
    <div className={work} key={workInfo.name}>
      <WorkExperience {...workInfo} />
    </div>
  ));

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
    props: { workExperiences },
  };
};

About.propTypes = {
  workExperiences: arrayOf(shape(workExperience)).isRequired,
};

export default About;
