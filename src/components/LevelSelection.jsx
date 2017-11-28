import React from 'react';
import { Link } from 'react-router-dom';
import connector from '../connector';
import { levels } from '../text';

class LevelSelection extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		return e.target.tagName === 'A' && this.props.changeLevel(e.target.textContent);
	}

    render() {
		return (
			<div className='level-selection' onClick={this.handleClick}>
				<ul>
					{
						Object.keys(levels).map((level, key) => {
							return <li key={key}><Link to={`${process.env.PUBLIC_URL}/playground`}>{level}</Link></li>
						})
					}
				</ul>
			</div>
		);
	}
}

export default connector(LevelSelection);