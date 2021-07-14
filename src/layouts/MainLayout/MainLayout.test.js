import { fireEvent, render } from 'testUtils';
import MainLayout from '.';

describe('<MainLayout />', () => {
  const props = {
    links: [
      {
        href: '/',
        text: 'Home',
      },
    ],
    socialLinks: [
      {
        icon: {
          url: 'https://www.placecage.com/32/32',
        },
        name: 'placecage',
        url: 'https://www.placecage.com/',
      },
    ],
    title: 'Home',
  };

  test('renders without crashing', () => {
    const { unmount } = render(
      <MainLayout {...props}>
        <div>Main Layout</div>
      </MainLayout>
    );
    unmount();
  });

  test('has a title', () => {
    const { queryByText } = render(
      <MainLayout {...props}>
        <div>Main Layout</div>
      </MainLayout>
    );
    expect(queryByText('Home')).toBeInTheDocument();
  });

  test('renders the sidenav', () => {
    const { queryByText } = render(
      <MainLayout {...props}>
        <div>Main Layout</div>
      </MainLayout>
    );
    expect(queryByText('Navigation')).toBeInTheDocument();
  });

  test('renders the social links', () => {
    render(
      <MainLayout {...props}>
        <div>Main Layout</div>
      </MainLayout>
    );
    expect(
      document.querySelector('img[alt="placecage Icon"]')
    ).toBeInTheDocument();
  });

  describe('toggleDarkMode', () => {
    test('renders as darkmode by default', () => {
      render(
        <MainLayout {...props}>
          <div>Main Layout</div>
        </MainLayout>
      );

      expect(document.querySelector('.light-mode')).not.toBeInTheDocument();
      expect(document.querySelector('.dark-mode')).toBeInTheDocument();
    });

    test('when the toggle is clicked changes to lightmode', () => {
      const { queryByText } = render(
        <MainLayout {...props}>
          <div>Main Layout</div>
        </MainLayout>
      );

      const toggleDarkModeButton = queryByText('Toggle');

      fireEvent.click(toggleDarkModeButton);

      expect(document.querySelector('.dark-mode')).not.toBeInTheDocument();
      expect(document.querySelector('.light-mode')).toBeInTheDocument();
    });
  });
});
