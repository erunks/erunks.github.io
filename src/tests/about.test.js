import { render } from 'testUtils';
import * as contentfulTransformers from '@contentful/rich-text-from-markdown';
import * as contentful from 'lib/contentful';
import { richTextWorkExperiences } from 'mocks/richTextWorkExperiences';
import About, { getStaticProps } from 'pages/about';

describe('<About />', () => {
  const route = '/about';

  it('renders without crashing', () => {
    const { unmount } = render(<About work={richTextWorkExperiences} />, {
      route,
    });
    unmount();
  });

  describe('#getStaticProps', () => {
    const mockGetAllWorkExperiences = jest.fn(() =>
      Promise.resolve(richTextWorkExperiences)
    );
    const mockRichTextFromMarkdown = jest.fn((val) => Promise.resolve(val));
    jest
      .spyOn(contentful, 'getAllWorkExperiences')
      .mockImplementation(mockGetAllWorkExperiences);
    jest
      .spyOn(contentfulTransformers, 'richTextFromMarkdown')
      .mockImplementation(mockRichTextFromMarkdown);

    it('returns static props', async () => {
      const { props: staticProps } = await getStaticProps(route);

      expect(mockGetAllWorkExperiences).toHaveBeenCalled();
      expect(mockRichTextFromMarkdown).toHaveBeenCalled();
      expect(staticProps.work).toEqual(richTextWorkExperiences);
    });
  });
});
