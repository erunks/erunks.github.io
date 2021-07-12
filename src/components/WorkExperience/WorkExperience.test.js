import { render } from 'testUtils';
import WorkExperience from '.';

describe('<WorkExperience />', () => {
  const descriptionText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const props = {
    altLogo: { url: 'https://www.placecage.com/600/125' },
    description: {
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: 'text',
              value: descriptionText,
            },
          ],
          data: {},
          nodeType: 'paragraph',
        },
      ],
      data: {},
      nodeType: 'document',
    },
    endDate: null,
    locale: 'en',
    location: 'Geo, Location',
    logo: { url: 'https://www.placecage.com/600/125' },
    name: 'Company',
    position: 'Position',
    startDate: '2021-06-01T00:00:00.000-05:00',
  };

  test('renders without crashing', () => {
    const { unmount } = render(<WorkExperience {...props} />);
    unmount();
  });

  test('renders with all props', () => {
    const { getByText } = render(<WorkExperience {...props} />);

    expect(
      document.querySelector(`img[alt="${props.name} Logo"]`)
    ).toBeInTheDocument();
    expect(getByText(props.position)).toBeInTheDocument();
    expect(getByText(props.location)).toBeInTheDocument();
    expect(getByText('June 2021 - Present')).toBeInTheDocument();
    expect(getByText(descriptionText)).toBeInTheDocument();
  });

  describe('timeRange', () => {
    test('renders as startDate to Present', () => {
      const { getByText } = render(<WorkExperience {...props} />);

      expect(getByText('June 2021 - Present')).toBeInTheDocument();
    });

    test('renders as startDate to endDate', () => {
      const endDateProps = {
        ...props,
        startDate: '2021-06-01T00:00:00.000-05:00',
        endDate: '2022-07-01T00:00:00.000-05:00',
      };

      const { getByText } = render(<WorkExperience {...endDateProps} />);

      expect(getByText('June 2021 - July 2022')).toBeInTheDocument();
    });
  });
});
