import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Chart } from 'src/features/home';

describe('home/Chart', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Chart />
    );

    expect(
      renderedComponent.find('.home-chart').getElement()
    ).to.exist;
  });
});
