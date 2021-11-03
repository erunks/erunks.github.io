import { act, cleanup, fireEvent, render } from 'testUtils';
import axios from 'axios';
import * as helpers from 'lib/helpers';
import { mockBusinessCards } from 'mocks/contentful';
import BusinessCard from '.';

const mockBusinessCard = mockBusinessCards[0];
let mockUseMeetsScreenRequirementsReturns = {
  heightMet: false,
  widthMet: false,
};
jest.mock('hooks/useMeetsScreenRequirements', () => () =>
  mockUseMeetsScreenRequirementsReturns
);

const downloadFileSpy = jest.spyOn(helpers, 'downloadFile');
const postSpy = jest.spyOn(axios, 'post');

beforeEach(jest.clearAllMocks);
afterEach(cleanup);
afterAll(jest.restoreAllMocks);

describe('<BusinessCard />', () => {
  const props = {
    ...mockBusinessCard,
  };

  it('renders without crashing', () => {
    const { unmount } = render(<BusinessCard {...props} />);
    unmount();
  });

  describe('when the screen requirements are not met', () => {
    beforeEach(() => {
      mockUseMeetsScreenRequirementsReturns = {
        heightMet: false,
        widthMet: false,
      };
    });

    it('renders with the overlay', () => {
      const { getByText } = render(<BusinessCard {...props} />);

      const overlay = getByText(
        'Please rotate your screen for the best viewing experience.'
      );
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('when the screen requirements are met', () => {
    beforeEach(() => {
      mockUseMeetsScreenRequirementsReturns = {
        heightMet: true,
        widthMet: true,
      };
    });

    it('renders without the overlay', () => {
      const { queryByText } = render(<BusinessCard {...props} />);

      const overlay = queryByText(
        'Please rotate your screen for the best viewing experience.'
      );
      expect(overlay).not.toBeInTheDocument();
    });

    describe('when the card should flip over', () => {
      const testCardFlippedByEvent = async (event) => {
        render(<BusinessCard {...props} />);

        await event();

        expect(
          document.getElementsByClassName('business_card__flipped')[0]
        ).toBeInTheDocument();
      };

      it('happens on click', async () => {
        const clickEvent = async () =>
          act(async () =>
            fireEvent.click(
              document.getElementsByClassName('business_card_body')[0]
            )
          );
        await testCardFlippedByEvent(clickEvent);
      });

      it('happens on the keyup for the enter key', async () => {
        const clickEvent = async () =>
          act(async () =>
            fireEvent.type(
              document.getElementsByClassName('business_card_body')[0],
              '{enter}'
            )
          );
        await testCardFlippedByEvent(clickEvent);
      });

      it('happens on the keyup for the space key', async () => {
        const clickEvent = async () =>
          act(async () =>
            fireEvent.type(
              document.getElementsByClassName('business_card_body')[0],
              '{space}'
            )
          );
        await testCardFlippedByEvent(clickEvent);
      });
    });

    describe('when clicking the download button', () => {
      const renderAndClickDownloadButton = async () => {
        render(<BusinessCard {...props} />);

        const downloadButton = document.getElementsByClassName(
          'business_card__download'
        )[0];
        expect(downloadButton).toBeInTheDocument();

        await act(async () => {
          await fireEvent.click(downloadButton);
        });
      };

      it('makes an axios request to download the vcf card', async () => {
        await renderAndClickDownloadButton();

        expect(postSpy).toHaveBeenCalled();
      });

      describe('when the axios request is successful', () => {
        beforeEach(() => {
          postSpy.mockImplementationOnce(() =>
            Promise.resolve({
              data: helpers.createVcfFromBusinessCard(mockBusinessCard),
              headers: {
                'content-disposition':
                  'attachment; filename="business_card.vcf"',
                'content-type': 'text/vcard',
              },
            })
          );
        });

        it('creats an a tag element, with the download data and triggers a click event', async () => {
          await renderAndClickDownloadButton();

          expect(downloadFileSpy).toHaveBeenCalled();
        });
      });

      describe('when the axios request is unsuccessful', () => {
        const spyConsoleError = jest
          .spyOn(console, 'error')
          .mockImplementation();
        const errorMessage = 'Error downloading vcf card';

        beforeEach(() => {
          postSpy.mockImplementationOnce(() => Promise.reject(errorMessage));
        });

        it('logs and error in the console', async () => {
          await renderAndClickDownloadButton();

          expect(postSpy).toHaveBeenCalled();
          expect(spyConsoleError).toHaveBeenCalledWith(errorMessage);
        });
      });
    });
  });
});
