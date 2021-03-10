import axios from 'axios';
import { SOCIAL_FIELDS } from './collections/social.js';
import { WORK_EXPERIENCE_FIELDS } from './collections/work_experience.js';
import get from 'lodash/get';

const postGraphQL = async (query, preview = false) => {
  try {
    const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
    const headers = ({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`
      }
    });

    const { data } = await axios.post(
      url,
      JSON.stringify({ query }),
      headers
    );

    return data;
  } catch (err) {
    console.error(err);
  }
};

const getAllFromCollection = async (collectionName, fields = '', preview = false) => {
  const items = await postGraphQL(
    `query {
      ${collectionName} {
        items {
          ${fields}
        }
      }
    }`,
    preview
  );
  
  return get(items, `data.${collectionName}.items`, []);
}

export const getAllSocialLinks = async (preview = false) => await getAllFromCollection('socialCollection', SOCIAL_FIELDS, preview);
export const getAllWorkExperiences = async (preview = false) => await getAllFromCollection('workExperienceCollection', WORK_EXPERIENCE_FIELDS, preview);

export default {
  getAllSocialLinks,
  getAllWorkExperiences,
};
