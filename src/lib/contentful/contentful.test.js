import axios from 'axios';
import {
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
} from 'lib/constants';
import { SOCIAL_FIELDS } from './collections/social';
import { WORK_EXPERIENCE_FIELDS } from './collections/work_experience';
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

  describe('getAllSocialLinks', () => {
    test('should post to the graphql endpoint and get the social collection', async () => {
      const mockedItems = [
        {
          icon: {
            url: 'https://example.com/icon.png',
          },
          name: 'Example',
          url: 'https://example.com',
        },
      ];
      const mockResponse = {
        data: {
          socialCollection: {
            items: mockedItems,
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

      expect(socialLinks).toEqual(mockedItems);
    });
  });

  describe('getAllWorkExperiences', () => {
    test('should post to the graphql endpoint and get the work collection', async () => {
      const mockedItems = [
        {
          altLogo: {
            url: 'https://example.com/icon.png',
          },
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          endDate: null,
          location: 'A Location',
          logo: {
            url: 'https://example.com/icon.png',
          },
          name: 'Example Company',
          position: 'A Position',
          startDate: '2018-01-01T00:00:00.000-05:00',
        },
      ];
      const mockResponse = {
        data: {
          workExperienceCollection: {
            items: mockedItems,
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

      expect(workExperiences).toEqual(mockedItems);
    });
  });
});
