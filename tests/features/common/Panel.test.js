import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Panel } from 'src/features/common';

describe('common/Panel', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Panel />
    );

    expect(
      renderedComponent.find('.common-panel').getElement()
    ).to.exist;
  });
});
