import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Preloader } from 'src/features/common';

describe('common/Preloader', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Preloader />
    );

    expect(
      renderedComponent.find('.common-preloader').getElement()
    ).to.exist;
  });
});
