import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Button } from 'src/features/common';

describe('common/Button', () => {
	it('renders node with correct class name', () => {
		const renderedComponent = shallow(<Button />);

		expect(renderedComponent.find('.common-button').getElement()).to.exist;
	});
});
