import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Auth } from 'src/features/auth/Auth';

describe('auth/Auth', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Auth {...props} />
    );

    expect(
      renderedComponent.find('.auth-auth').getElement()
    ).to.exist;
  });
});
