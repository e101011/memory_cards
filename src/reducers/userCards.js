function userCards(state = [], action) {
	if (action.type === 'REMOVE_USER_CARD') {
		return action.userCards;
	}
	return state;
}

export default userCards;