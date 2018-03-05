import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TrackList } from 'src/features/common';

describe('common/TrackList', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <TrackList />
    );

    expect(
      renderedComponent.find('.common-track-list').getElement()
    ).to.exist;
  });
});
