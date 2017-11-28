import { connect } from 'react-redux';

const connector = connect(
	state => ({
		userCards: state.userCards,
		level: state.level,
		clicks: state.clicks,
		time: state.time
	}),
	dispatch => ({
		changeLevel: level1 => { dispatch({ type: 'CHANGE_LEVEL', level: level1 })},
		changeCards: card => { dispatch({ type: 'REMOVE_USER_CARD', userCards: card })},
		increaseClicks: click => { dispatch({ type: 'INCREASE_CLICKS', clicks: click })},
		setTime: value => { dispatch({ type: 'SET_TIME', time: value })}
	})
);

export default connector;