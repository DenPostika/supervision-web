import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Header } from 'src/features/common';

describe('common/Header', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Header />
    );

    expect(
      renderedComponent.find('.common-header').getElement()
    ).to.exist;
  });
});
