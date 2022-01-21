export const CONTENTFUL_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
export const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
export const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

/* eslint-disable-next-line prefer-destructuring */
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = NODE_ENV === 'production';
