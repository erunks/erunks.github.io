import { createMocks } from 'node-mocks-http';
import { handler } from 'pages/api/vcf';
import { mockBusinessCards } from 'mocks/contentful';

describe('/api/vcf', () => {
  describe('when the response is successful', () => {
    it('should return a 200 response', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        url: '/api/vcf',
        body: {
          info: mockBusinessCards[0],
        },
      });

      await handler(req, res);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('when the response is unsuccessful', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    it('should return a 500 response', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        url: '/api/vcf',
      });

      await handler(req, res);
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
    });

    it('should return a 500 response', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        url: '/api/vcf',
      });

      await handler(req, res);
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
    });
  });
});
