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

  describe('#downloadFile', () => {
    it('should download the file', () => {
      const link = {
        click: jest.fn(),
      };
      jest.spyOn(document, 'createElement').mockImplementation(() => link);

      const contentType = 'text/plain';
      const data = 'Plain text data';
      const filename = 'file.txt';

      helpers.downloadFile(filename, contentType, data);

      expect(link.href).toEqual(`data:${contentType};charset=utf-8,${data}`);
      expect(link.download).toEqual(filename);
      expect(link.click).toHaveBeenCalledTimes(1);
    });
  });
});
