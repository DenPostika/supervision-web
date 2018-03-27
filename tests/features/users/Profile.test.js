import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Profile } from 'src/features/users/Profile';

describe('users/Profile', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Profile {...props} />
    );

    expect(
      renderedComponent.find('.users-profile').getElement()
    ).to.exist;
  });
});
