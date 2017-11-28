import React from 'react';
import connector from '../connector';
import { buttons } from '../text';
import Alternative from './Alternative';

class UserCards extends React.Component {
	constructor(props) {
		super(props);

		this.remove = this.remove.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		document.querySelector('.memory-game').classList.add('user-cards-page');
	}

	componentWillUnmount() {
		document.querySelector('.memory-game').classList.remove('user-cards-page');
	}

	remove(key) {
		const updatedCards = this.props.userCards.filter( (item, i) => i !== key);

		this.props.changeCards(updatedCards);
		localStorage.setItem('userCards', JSON.stringify(updatedCards));
	}

	handleClick(e) {
		if (e.target.className === 'play') {
			this.props.history.push(`${process.env.PUBLIC_URL}/playground`);
			this.props.changeLevel('custom');
		} else {
			this.props.history.push(`${process.env.PUBLIC_URL}/create`);
		}
	}

	render() {
		return (
			<div className='user-cards'>
				{
					this.props.userCards.map((item, i) => {
						return (
							<div className='card' key={i}>
								<div><span className='word'>{ item.word }</span></div>
								<div><span className='meaning'>{ item.meaning }</span></div>
								<button onClick={() => this.remove(i)}/>
							</div>
						);
					})
				}
				<div className='buttons' onClick={this.handleClick}>
					<button className='play'>{ buttons.play }</button>
					<button className='add'>{ buttons.addNew }</button>
				</div>
				<Alternative type='play'/>
			</div>
		);
	};
}

export default connector(UserCards);