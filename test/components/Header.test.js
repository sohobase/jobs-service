import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../src/shared/components/Header';

describe('<Header />', () => {
  // -- Renders
  it('renders by default', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
