import axios from 'axios';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  IS_PRODUCTION,
} from 'lib/constants';
import get from 'lodash/get';
import join from 'lodash/join';
import map from 'lodash/map';
import { SOCIAL_FIELDS } from './collections/social';
import { WORK_EXPERIENCE_FIELDS } from './collections/work_experience';

const postGraphQL = async (query, preview = IS_PRODUCTION) => {
  try {
    const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN
        }`,
      },
    };

    const { data } = await axios.post(url, JSON.stringify({ query }), headers);

    return data;
  } catch (err) {
    console.error(err);
  }
};

const getAllFromCollection = async (
  collectionName,
  fields = '',
  options = {},
  preview = IS_PRODUCTION
) => {
  const queryOptions = join(
    map(options, (value, key) => `${key}:${value}`),
    ', '
  );
  const queryOptionsString = queryOptions ? `(${queryOptions})` : '';

  const items = await postGraphQL(
    `query {
      ${collectionName}${queryOptionsString} {
        items {
          ${fields}
        }
      }
    }`,
    preview
  );

  return get(items, `data.${collectionName}.items`, []);
};

export const getAllSocialLinks = async (
  options = {},
  preview = IS_PRODUCTION
) => {
  const socials = await getAllFromCollection(
    'socialCollection',
    SOCIAL_FIELDS,
    options,
    preview
  );
  return socials;
};

export const getAllWorkExperiences = async (options = {}, preview = false) => {
  const experiences = await getAllFromCollection(
    'workExperienceCollection',
    WORK_EXPERIENCE_FIELDS,
    options,
    preview
  );
  return experiences;
};

export default {
  getAllSocialLinks,
  getAllWorkExperiences,
};
