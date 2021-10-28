import { useCallback, useEffect, useState } from 'react';

const useMeetsScreenRequirements = ({width, height} = {width: 0, height: 0}) => {
  const [body, setBody] = useState(null);
  const [bodyHeight, setBodyHeight] = useState(body?.clientHeight);
  const [bodyWidth, setBodyWidth] = useState(body?.clientWidth);

  const handleResize = useCallback(() => {
    setBodyHeight(body?.clientHeight);
    setBodyWidth(body?.clientWidth);
    console.log(bodyHeight, bodyWidth); // eslint-disable-line no-console
  }, []);

  useEffect(() => {
    if (global?.window.document.body) {
      setBody(window.document.body);
      handleResize();
    }
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.screen.orientation.addEventListener('change', handleResize);

    console.log(window, window.screen, navigator); // eslint-disable-line no-console

    return () => {
      window.removeEventListener('resize', handleResize);
      window.screen.orientation.removeEventListener('change', handleResize);
    };
  }, [handleResize]);

  return {
    heightMet: bodyHeight >= height,
    widthMet: bodyWidth >= width,
  };
};

export default useMeetsScreenRequirements;
