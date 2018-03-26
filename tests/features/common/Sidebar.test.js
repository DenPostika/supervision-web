import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Sidebar } from 'src/features/common';

describe('common/Sidebar', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Sidebar />
    );

    expect(
      renderedComponent.find('.common-sidebar').getElement()
    ).to.exist;
  });
});
