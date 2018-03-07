import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { StatusWidget } from 'src/features/common';

describe('common/StatusWidget', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <StatusWidget />
    );

    expect(
      renderedComponent.find('.common-status-widget').getElement()
    ).to.exist;
  });
});
