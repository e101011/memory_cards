import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Playground from '../../src/components/Playground';
import Adapter from 'enzyme-adapter-react-16';
import { cardsSettings } from '../../src/heplers/cards-data';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers/index';

configure({ adapter: new Adapter() });

const getComponent = (level) => shallow(<Playground/>, { context: { store: createStore(rootReducer, { level }) }}).dive();

describe('Playground', () => {
	it('should be equal to number of cards for "easy" level', () => {
		const PlaygroundComponent = getComponent('easy');
		expect(PlaygroundComponent.find('.card').length).toEqual(cardsSettings['easy'].number);
	});

	it('should be equal to number of cards for "medium" level', () => {
		const PlaygroundComponent = getComponent('medium');
		expect(PlaygroundComponent.find('.card').length).toEqual(cardsSettings['medium'].number);
	});

	it('should be equal to number of cards for "hard" level', () => {
		const PlaygroundComponent = getComponent('hard');
		expect(PlaygroundComponent.find('.card').length).toEqual(cardsSettings['hard'].number);
	});
});