import { useCallback, useEffect, useState } from 'react';

const useMeetsScreenRequirements = (
  { width, height } = { width: 0, height: 0 }
) => {
  const [body, setBody] = useState(null);
  const [bodyWidth, setBodyWidth] = useState(body?.clientWidth);
  const [bodyHeight, setBodyHeight] = useState(body?.clientHeight);

  const handleResize = useCallback(() => {
    setBodyWidth(body?.clientWidth);
    setBodyHeight(body?.clientHeight);
  }, [body]);

  useEffect(() => {
    if (document) {
      setBody(document.body);
      handleResize();
    }

    window.addEventListener('resize', handleResize);
    window.screen?.orientation?.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.screen?.orientation?.removeEventListener('change', handleResize);
    };
  }, [handleResize]);

  return {
    widthMet: bodyWidth >= width,
    heightMet: bodyHeight >= height,
  };
};

export default useMeetsScreenRequirements;
