import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button from '../../src/shared/components/Button';

describe('<Button />', () => {
  // -- Renders
  it('renders by default', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a caption property', () => {
    const tree = renderer.create(<Button caption="Test button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts a className property', () => {
    const tree = renderer.create(<Button className="my_button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // -- Actions
  it('calls onClick property when clicked', () => {
    const onClick = jest.fn();
    const button = shallow(<Button onClick={onClick} />);
    button.simulate('click');
    expect(onClick).toBeCalled();
  });
});
