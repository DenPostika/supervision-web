import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SignIn } from 'src/features/auth/SignIn';

describe('auth/SignIn', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignIn {...props} />
    );

    expect(
      renderedComponent.find('.auth-sign-in').getElement()
    ).to.exist;
  });
});
