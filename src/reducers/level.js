function level(state = [], action) {
	if (action.type === 'CHANGE_LEVEL') {
		return action.level;
	}
	return state;
}

export default level;