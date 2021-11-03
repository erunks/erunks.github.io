import { render } from 'testUtils';
import Home from 'pages/index';

describe('(<Home />)', () => {
  test('renders without crashing', () => {
    const { unmount } = render(<Home />);
    unmount();
  });

  test('renders the home page', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Index')).toBeInTheDocument();
  });
});
