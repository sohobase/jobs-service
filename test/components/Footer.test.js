import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../src/shared/components/Footer';

describe('<Footer />', () => {
  // -- Renders
  it('renders by default', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
