import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Calendar } from 'src/features/users/Calendar';

describe('users/Calendar', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Calendar {...props} />
    );

    expect(
      renderedComponent.find('.users-calendar').getElement()
    ).to.exist;
  });
});
