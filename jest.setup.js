import '@testing-library/jest-dom';

// Fix next/image in tests
// https://github.com/vercel/next.js/issues/18393#issuecomment-783269086
import * as NextImage from 'next/image';
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
