import { combineReducers } from 'redux';

import clicks from './clicks';
import level from './level';
import userCards from './userCards';
import time from './time';

const rootReducer = combineReducers({ clicks, level, userCards, time });

export default rootReducer;