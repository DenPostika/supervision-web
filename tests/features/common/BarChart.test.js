import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { BarChart } from 'src/features/common';

describe('common/BarChart', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <BarChart />
    );

    expect(
      renderedComponent.find('.common-bar-chart').getElement()
    ).to.exist;
  });
});
