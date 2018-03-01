import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Box } from 'src/features/common';

describe('common/Box', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Box />
    );

    expect(
      renderedComponent.find('.common-box').getElement()
    ).to.exist;
  });
});
