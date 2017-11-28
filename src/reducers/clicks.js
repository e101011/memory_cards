function clicks(state = [], action) {
	if (action.type === 'INCREASE_CLICKS') {
		return action.clicks;
	}
	return state;
}

export default clicks;