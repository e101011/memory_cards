import React from 'react';
import { connect } from 'react-redux';
import TitleScreen from '../components/TitleScreen';

function masStateToProps(state) {
	return {
		level: state.level,
		clicks: state.clicks
	}
}

const App = connect(masStateToProps)(TitleScreen);

export default App;