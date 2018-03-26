import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FaceDetection } from 'src/features/users/FaceDetection';

describe('users/FaceDetection', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FaceDetection {...props} />
    );

    expect(
      renderedComponent.find('.users-face-detection').getElement()
    ).to.exist;
  });
});
