import { atom, selector } from 'recoil';

export const socialState = atom({
  key: 'socialState',
  default: []
});

export const getSocialState = selector({
  key: 'getSocialState',
  get: ({ get }) => get(socialState)
});

export default {
  getSocialState,
  socialState
};
