import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useMeetsScreenRequirements from 'hooks/useMeetsScreenRequirements';

describe('useMeetsScreenRequirements', () => {
  let clientWidth = 0;
  let clientHeight = 0;
  jest
    .spyOn(document.body, 'clientWidth', 'get')
    .mockImplementation(() => clientWidth);
  jest
    .spyOn(document.body, 'clientHeight', 'get')
    .mockImplementation(() => clientHeight);

  const fireResizeAndExpectRequirements = (
    result,
    shouldWidthBeMet,
    shouldHeightBeMet
  ) => {
    act(() => {
      fireEvent(window, new Event('resize'));
    });

    expect(result.current.widthMet).toBe(shouldWidthBeMet);
    expect(result.current.heightMet).toBe(shouldHeightBeMet);
  };

  describe('when the screen is large enough', () => {
    beforeEach(() => {
      clientWidth = 1920;
      clientHeight = 1080;
    });

    it('should return true', () => {
      const { result } = renderHook(() =>
        useMeetsScreenRequirements({
          width: 1280,
          height: 720,
        })
      );

      fireResizeAndExpectRequirements(result, true, true);
    });
  });

  describe('when the screen is too small', () => {
    beforeEach(() => {
      clientWidth = 640;
      clientHeight = 480;
    });

    it('should return false', () => {
      const { result } = renderHook(() =>
        useMeetsScreenRequirements({
          width: 1280,
          height: 720,
        })
      );

      fireResizeAndExpectRequirements(result, false, false);
    });
  });
});
