import React from 'react';
import renderer from 'react-test-renderer';

import Landing from '../../src/shared/components/Landing';

describe('<Landing />', () => {
  // -- Renders
  it('renders by default', () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
