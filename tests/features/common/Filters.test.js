import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Filters } from 'src/features/common';

describe('common/Filters', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Filters />
    );

    expect(
      renderedComponent.find('.common-filters').getElement()
    ).to.exist;
  });
});
