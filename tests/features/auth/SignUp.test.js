import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SignUp } from 'src/features/auth/SignUp';

describe('auth/SignUp', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignUp {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-up').getElement()
    ).to.exist;
  });
});
