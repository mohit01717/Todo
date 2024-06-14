import * as React from 'react';
import { render } from '@testing-library/react';

import { EditTodo } from '..';

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

describe('<EditTodo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<EditTodo />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
