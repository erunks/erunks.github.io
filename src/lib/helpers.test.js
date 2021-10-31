import { mockBusinessCards } from 'mocks/contentful';
import * as helpers from './helpers';

describe('helpers', () => {
  describe('#createVcfFromBusinessCard', () => {
    it('should create a vcf from a business card', () => {
      const businessCard = mockBusinessCards[0];
      const vcf = helpers.createVcfFromBusinessCard(businessCard);
      expect(vcf).toMatchSnapshot();
    });
  });
});
