import { render } from 'testUtils';
import Social from '.';

describe('<Social />', () => {
  const props = {
    icon: {
      url: 'https://www.placecage.com/32/32',
    },
    name: 'placecage',
    url: 'https://www.placecage.com/',
  };

  test('renders without crashing', () => {
    const { unmount } = render(<Social {...props} />);
    unmount();
  });
});
