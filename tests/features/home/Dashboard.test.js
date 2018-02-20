import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from 'src/features/home/Dashboard';

describe('home/Dashboard', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Dashboard {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-dashboard').getElement()
    ).to.exist;
  });
});
