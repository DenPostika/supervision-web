import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Profile } from 'src/features/user/Profile';

describe('user/Profile', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Profile {...props} />
    );

    expect(
      renderedComponent.find('.user-profile').getElement()
    ).to.exist;
  });
});
