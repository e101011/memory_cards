import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import LevelSelection from '../../src/components/LevelSelection';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/store';

configure({ adapter: new Adapter() });

const LevelSelectionComponent = shallow(<LevelSelection/>, { context: { store }}).dive();

describe('LevelSelection', () => {
	it('should return 3 children', () => {
		expect(LevelSelectionComponent.find('ul').children().length).toEqual(3);
	});

	it('should return "easy"', () => {
		expect(LevelSelectionComponent.find('Link').at(0).children().text()).toEqual('easy');
	});

	it('should return "medium"', () => {
		expect(LevelSelectionComponent.find('Link').at(1).children().text()).toEqual('medium');
	});

	it('should return "hard"', () => {
		expect(LevelSelectionComponent.find('Link').at(2).children().text()).toEqual('hard');
	});
});