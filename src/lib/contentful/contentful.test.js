import axios from 'axios';
import {
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
} from 'lib/constants';
import {
  mockBusinessCards,
  mockSocialLinks,
  mockWorkExperiences,
} from 'mocks/contentful';
import {
  BUSINESS_CARD_FIELDS,
  SOCIAL_FIELDS,
  WORK_EXPERIENCE_FIELDS,
} from './collections';
import * as contentful from '.';

const postSpy = jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });

describe('contentful', () => {
  const graphqlHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  };
  const graphqlUrl = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

  describe('stringifyQuery', () => {
    test('should return a stringified query', () => {
      const expectedQuery =
        '{"query":"query {\\n posts(order:name_ASC) {\\n items {\\n name\\n }\\n }\\n }"}';
      const query = `query {
        posts(order:name_ASC) { 
          items { 
            name
          } 
        } 
      }`;

      expect(contentful.stringifyQuery(query)).toEqual(expectedQuery);
    });
  });

  describe('getAllFromCollection', () => {
    const collectionName = 'posts';
    const fields = 'name';
    const options = { order: 'name_ASC' };

    test('it formats the query options correctly', async () => {
      await contentful.getAllFromCollection(collectionName, fields, options);

      expect(postSpy).toHaveBeenCalledWith(
        graphqlUrl,
        contentful.stringifyQuery(
          `query {
            ${collectionName}(order:${options.order}) {
              items {
                ${fields}
              }
            }
          }`
        ),
        {
          headers: graphqlHeaders,
        }
      );
    });

    test('when the query fails', async () => {
      const consoleErrorSpy = jest.fn();
      jest.spyOn(console, 'error').mockImplementation(consoleErrorSpy);

      postSpy.mockImplementationOnce(() => Promise.reject(new Error('error')));

      await contentful.getAllFromCollection(collectionName, fields, options);

      expect(postSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('getAllBusinessCards', () => {
    test('should post to the graphql endpoint and get the business cards collection', async () => {
      const mockResponse = {
        data: {
          businessCardCollection: {
            items: mockBusinessCards,
          },
        },
      };

      postSpy.mockResolvedValueOnce({ data: mockResponse });

      const businessCards = await contentful.getAllBusinessCards();

      expect(postSpy).toHaveBeenCalledWith(
        graphqlUrl,
        contentful.stringifyQuery(
          `query {
            businessCardCollection {
              items {
                ${BUSINESS_CARD_FIELDS}
              }
            }
          }`
        ),
        {
          headers: graphqlHeaders,
        }
      );

      expect(businessCards).toEqual(mockBusinessCards);
    });
  });

  describe('getAllSocialLinks', () => {
    test('should post to the graphql endpoint and get the social collection', async () => {
      const mockResponse = {
        data: {
          socialCollection: {
            items: mockSocialLinks,
          },
        },
      };

      postSpy.mockResolvedValueOnce({ data: mockResponse });

      const socialLinks = await contentful.getAllSocialLinks();

      expect(postSpy).toHaveBeenCalledWith(
        graphqlUrl,
        contentful.stringifyQuery(
          `query {
            socialCollection {
              items {
                ${SOCIAL_FIELDS}
              }
            }
          }`
        ),
        {
          headers: graphqlHeaders,
        }
      );

      expect(socialLinks).toEqual(mockSocialLinks);
    });
  });

  describe('getAllWorkExperiences', () => {
    test('should post to the graphql endpoint and get the work collection', async () => {
      const mockResponse = {
        data: {
          workExperienceCollection: {
            items: mockWorkExperiences,
          },
        },
      };

      postSpy.mockResolvedValueOnce({ data: mockResponse });

      const workExperiences = await contentful.getAllWorkExperiences();

      expect(postSpy).toHaveBeenCalledWith(
        graphqlUrl,
        contentful.stringifyQuery(
          `query {
            workExperienceCollection {
              items {
                ${WORK_EXPERIENCE_FIELDS}
              }
            }
          }`
        ),
        {
          headers: graphqlHeaders,
        }
      );

      expect(workExperiences).toEqual(mockWorkExperiences);
    });
  });
});
