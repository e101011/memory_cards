function time(state = [], action) {
	if (action.type === 'SET_TIME') {
		return action.time;
	}
	return state;
}

export default time;