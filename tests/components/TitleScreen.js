import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import TitleScreen from '../../src/components/TitleScreen';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const TitleScreenComponent = shallow(<TitleScreen/>);

describe('TitleScreen', () => {
	it('should return block with "title-screen" class', () => {
		expect(TitleScreenComponent.find('.title-screen').length).toEqual(1);
	});
});