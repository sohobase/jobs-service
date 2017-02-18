import React from 'react';
import renderer from 'react-test-renderer';

import JobListItem from '../../src/shared/components/JobListItem';

describe('<JobListItem />', () => {
  // -- Renders
  it('renders by default', () => {
    const tree = renderer.create(<JobListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a name property', () => {
    const tree = renderer.create(<JobListItem name="Test job" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
