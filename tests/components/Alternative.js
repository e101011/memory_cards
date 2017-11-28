import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Alternative from '../../src/components/Alternative';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function getComponent(type) {
	return shallow(<Alternative type={type}/>);
}

describe('Alternative', () => {
	it('should not return button with "play" class when component receives "create" type', () => {
		const AlternativeComponent = getComponent('create');
		expect(AlternativeComponent.find('.alternative .play').length).toEqual(0);
	});

	it('should return button with "create" class when component receives "create" type', () => {
		const AlternativeComponent = getComponent('create');
		expect(AlternativeComponent.find('.alternative .create').length).toEqual(1);
	});

	it('should return button with "play" class when component receives "play" type', () => {
		const AlternativeComponent = getComponent('play');
		expect(AlternativeComponent.find('.alternative .play').length).toEqual(1);
	});
});