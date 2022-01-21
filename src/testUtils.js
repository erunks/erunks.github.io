import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import router from 'next/router';
import { RecoilRoot } from 'recoil';

jest.mock('next/router', () => require('next-router-mock'));

const connectedRender = (component, options = {}) => {
  const route = options && options.route ? options.route : '/';
  const state = options && options.state;

  router.push(route);

  const Wrapper = ({ children }) => (
    <RecoilRoot initializeState={state}>{children}</RecoilRoot>
  );

  return render(component, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { userEvent as fireEvent };
export { connectedRender as render };
