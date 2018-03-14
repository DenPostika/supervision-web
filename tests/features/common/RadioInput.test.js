import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RadioInput } from 'src/features/common';

describe('common/RadioInput', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <RadioInput />
    );

    expect(
      renderedComponent.find('.common-radio-input').getElement()
    ).to.exist;
  });
});
