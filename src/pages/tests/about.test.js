import { render } from 'testUtils';
import * as contentfulTransformers from '@contentful/rich-text-from-markdown';
import * as contentful from 'lib/contentful';
import { workExperiences } from 'mocks/workExperiences';
import About, { getStaticProps } from '../about';

describe('<About />', () => {
  const route = '/route';

  test('renders without crashing', () => {
    const { unmount } = render(<About work={workExperiences} />, { route });
    unmount();
  });

  describe('#getStaticProps', () => {
    const mockGetAllWorkExperiences = jest.fn(() =>
      Promise.resolve(workExperiences)
    );
    const mockRichTextFromMarkdown = jest.fn((val) => Promise.resolve(val));
    jest
      .spyOn(contentful, 'getAllWorkExperiences')
      .mockImplementation(mockGetAllWorkExperiences);
    jest
      .spyOn(contentfulTransformers, 'richTextFromMarkdown')
      .mockImplementation(mockRichTextFromMarkdown);

    test('returns static props', async () => {
      const { props: staticProps } = await getStaticProps(route);

      expect(mockGetAllWorkExperiences).toHaveBeenCalled();
      expect(mockRichTextFromMarkdown).toHaveBeenCalled();
      expect(staticProps.work).toEqual(workExperiences);
    });
  });
});
