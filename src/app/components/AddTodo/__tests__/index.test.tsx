import * as React from 'react';
import { render } from '@testing-library/react';

import { AddTodo } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<AddTodo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AddTodo />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
