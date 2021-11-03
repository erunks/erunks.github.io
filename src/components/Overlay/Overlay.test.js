import { act, fireEvent, render } from 'testUtils';
import Overlay from '.';

const message = 'Overlay message.';
const OverlayComponent = <Overlay>{message}</Overlay>;

describe('<Overlay />', () => {
  it('renders without crashing', () => {
    const { unmount } = render(OverlayComponent);
    unmount();
  });

  it('renders children', () => {
    const { getByText } = render(OverlayComponent);

    expect(getByText(message)).toBeInTheDocument();
  });

  describe('when clicking the overlay button', () => {
    it('should close the overlay', async () => {
      render(OverlayComponent);

      expect(document.getElementsByClassName('overlay')[0]).toBeInTheDocument();

      await act(async () => {
        await fireEvent.click(
          document.getElementsByClassName('overlay__button')[0]
        );
      });

      expect(document.getElementsByClassName('overlay')[0]).toBeUndefined();
    });
  });
});
