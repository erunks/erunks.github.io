import { mockBusinessCards } from 'mocks/contentful';
import * as helpers from './helpers';

describe('helpers', () => {
  describe('#createVcfFromBusinessCard', () => {
    const businessCard = mockBusinessCards[0];

    it('should create a vcf from a business card', () => {
      const vcf = helpers.createVcfFromBusinessCard(businessCard);
      expect(vcf).toMatchSnapshot();
    });

    describe('when there is a logo url present in the card info', () => {
      it('should return a vcf with a logo and type', () => {
        const vcf = helpers.createVcfFromBusinessCard(businessCard);
        expect(vcf.logo).toEqual(businessCard.logo);
      });
    });

    describe('when there is no logo url present in the card info', () => {
      it('should return a vcf with no logo', () => {
        const businessCardWithoutLogo = {
          ...mockBusinessCards[0],
          logo: {},
        };
        const vcf = helpers.createVcfFromBusinessCard(businessCardWithoutLogo);
        expect(vcf.logo).toEqual({});
      });
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

  describe('#handleKeyUp', () => {
    it('should call the callback when the enter key is released', () => {
      const callback = jest.fn();
      const event = {
        keyCode: 13,
      };
      helpers.handleKeyUp(event, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call the callback when the space key is released', () => {
      const callback = jest.fn();
      const event = {
        keyCode: 32,
      };
      helpers.handleKeyUp(event, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call the callback when the key released is not enter or space', () => {
      const callback = jest.fn();
      const event = {
        keyCode: 0,
      };
      helpers.handleKeyUp(event, callback);
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});
