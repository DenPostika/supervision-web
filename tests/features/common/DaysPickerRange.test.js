import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DaysPickerRange } from 'src/features/common';

describe('common/DaysPickerRange', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <DaysPickerRange />
    );

    expect(
      renderedComponent.find('.common-days-picker-range').getElement()
    ).to.exist;
  });
});
