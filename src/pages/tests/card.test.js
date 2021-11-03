import { render } from 'testUtils';
import * as contentful from 'lib/contentful';
import { mockBusinessCards } from 'mocks/contentful';
import Card, { getStaticProps } from '../card';

describe('<Card />', () => {
  const route = '/card';

  it('renders without crashing', () => {
    const { unmount } = render(<Card card={mockBusinessCards[0]} />, { route });
    unmount();
  });

  describe('#getStaticProps', () => {
    const mockGetAllBusinessCards = jest.fn(() =>
      Promise.resolve(mockBusinessCards)
    );
    jest
      .spyOn(contentful, 'getAllBusinessCards')
      .mockImplementation(mockGetAllBusinessCards);

    it('returns static props', async () => {
      const { props: staticProps } = await getStaticProps(route);

      expect(mockGetAllBusinessCards).toHaveBeenCalled();
      expect(staticProps.card).toEqual(mockBusinessCards[0]);
    });
  });
});
