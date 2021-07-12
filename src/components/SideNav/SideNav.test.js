import { render } from 'testUtils';
import SideNav from '.';

describe('<SideNav />', () => {
  const props = {
    links: [
      {
        href: '/',
        text: 'Home',
      },
      {
        href: '/about',
        text: 'About',
      },
      {
        href: '/contact',
        text: 'Contact',
      },
    ],
  };

  test('renders without crashing', () => {
    const { unmount } = render(<SideNav {...props} />);
    unmount();
  });

  test('should render the active link as strong text', () => {
    render(<SideNav {...props} />, { route: '/about' });

    const activeLink = document.querySelector('strong');
    expect(activeLink).toBeInTheDocument();
    expect(activeLink.textContent).toEqual('About');
  });

  test('should render all the links passed by the props', () => {
    render(<SideNav {...props} />);

    const links = document.querySelectorAll('li');
    expect(links.length).toEqual(props.links.length);
  });
});
