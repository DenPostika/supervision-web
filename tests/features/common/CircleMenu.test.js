import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CircleMenu } from 'src/features/common';

describe('common/CircleMenu', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <CircleMenu />
    );

    expect(
      renderedComponent.find('.common-circle-menu').getElement()
    ).to.exist;
  });
});
