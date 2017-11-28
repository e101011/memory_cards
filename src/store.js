import React from 'react';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultCards = [
	{
		word: 'Test question custom card 1',
		meaning: 'Test answer custom card 1'
	},
	{
		word: 'Test question custom card 2',
		meaning: 'Test answer custom card 2'
	},
	{
		word: 'Test question custom card 3',
		meaning: 'Test answer custom card 3'
	},
	{
		word: 'Test question custom card 4',
		meaning: 'Test answer custom card 4'
	},
	{
		word: 'Test question custom card 5',
		meaning: 'Test answer custom card 5'
	}
];

const userCards = localStorage.getItem('userCards') ? JSON.parse(localStorage.getItem('userCards')) : defaultCards;

const defaultState = {
	level: 'easy',
	clicks: 0,
	userCards,
	time: null
};

const store = createStore(rootReducer, defaultState);

export default store;