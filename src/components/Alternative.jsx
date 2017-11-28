import React from 'react';
import PropTypes from 'prop-types';
import { buttons } from '../text';
import { tablet } from '../heplers/window-size';

class Alternative extends React.Component {
	render() {
		let button = this.props.type === 'create' ? buttons.create : buttons.playMenu;

		if (tablet) {
			button = this.props.type === 'create' ? buttons.createForTablet :  buttons.playForTablet;
		}

		return <div className='alternative'>{button}</div>;
	}
}

Alternative.propTypes = {
	type: PropTypes.string.isRequired
};

export default Alternative;