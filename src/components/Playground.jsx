import React from 'react';
import connector from '../connector';
import { letters, cardsSettings, change } from '../heplers/cards-data';
import Menu from './Menu';

class Playground extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			score: 0
		};

		this.getCards = this.getCards.bind(this);
		this.openCard = this.openCard.bind(this);
		this.resetState = this.resetState.bind(this);
		this.handleHint = this.handleHint.bind(this);
		this.switchMenu = this.switchMenu.bind(this);
	}

	componentDidMount() {
		this.resetState();
		document.querySelector('body').classList.add('playing');
	}

	componentWillUnmount() {
		document.querySelector('body').classList.remove('playing');
	}

	componentDidUpdate(nextProps) {
		if (this.props.level !== nextProps.level) {
			this.resetState();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.clicks === 0 && nextState.hintSize === document.querySelectorAll('.card').length && nextState.score === 0) {
			return true;
		}

		return this.props.level !== nextProps.level;
	}

	resetState() {
		this.props.increaseClicks(0);
		Array.from(document.querySelectorAll('.card')).map(elem => change.element(elem).remove('resolve').remove('active'));

		this.setState({
			hintSize: document.querySelectorAll('.card').length,
			maxScore: document.querySelectorAll('.card').length / 2,
			score: 0
		});
	}

	getCards() {
		let level, sortedCards;

		if (this.props.level === 'custom') {
			const allWords = [];

			this.props.userCards.map(item => {
				const { word, meaning } = item;
				allWords.push(word, meaning);
			});

			sortedCards = allWords.sort((a, b) => Math.random() - 0.5);

			document.querySelector('.memory-game').classList.add('playground-custom-page-base');

			this.props.userCards.length <= 2 ? level = 'easy' : document.querySelector('.memory-game').classList.add('playground-custom-page');
		} else {
			level = Object.keys(cardsSettings).filter(level => level === this.props.level);
			sortedCards = letters.substring(0, cardsSettings[level].number).split('').sort((a, b) => Math.random() - 0.5);
			// sortedCards = letters.substring(0, cardsSettings[level].number).split('');

			document.querySelector('.memory-game').classList.remove('playground-custom-page');
			document.querySelector('.memory-game').classList.remove('playground-custom-page-base');
		}

		const style = this.props.level === 'custom' && !level ? null : {
			width: `${ 100 / cardsSettings[level].width}%`,
			height: `${ 100 / cardsSettings[level].height}%`
		};

		return sortedCards.map((elem, i) => {
			return React.createElement('div', {
				className: 'card',
				key: i,
				style: style,
				'data-value': sortedCards[i],
				'data-key': i
			})
		});
	}

	openCard(e, currentCards) {
		const target = e.target;
		const { className } = target;
		const { value, key } = currentCards;
		const dataValue = target.getAttribute('data-value');
		const dataKey = target.getAttribute('data-key');

		if (className.includes('resolve') || !className.includes('card') || className.includes('cards')) {
			return;
		}

		this.props.increaseClicks(this.props.clicks + 1);

		value.push(dataValue);
		key.push(dataKey);

		if (key.length <= 2) {
			change.element(target, dataValue).add('active');

			let isCardsMatch = false;

			if (this.props.level === 'custom') {
				isCardsMatch = this.props.userCards.some(item => value[0] === item.word && value[1] === item.meaning || value[0] === item.meaning && value[1] === item.word);
			} else {
				isCardsMatch = value[0] === value[1];
			}

			if (key.length === 2) {
				if (key[0] === key[1]) {
					value.splice(0, 1);
					key.splice(0, 1);
				} else if (isCardsMatch) {
					this.setState({
						score: this.state.score + 1
					});

					if (this.state.score === this.state.maxScore - 1) {
						document.querySelector('.memory-game').classList.remove('playground-custom-page');
						document.querySelector('.memory-game').classList.remove('playground-custom-page-base');
						this.props.history.push(`${process.env.PUBLIC_URL}/result`);
						this.props.setTime(document.querySelector('.time').textContent);
					}

					Array.from(document.querySelectorAll('.active')).map(elem => change.element(elem, elem.textContent).add('resolve').remove('active'));

					value.splice(0);
					key.splice(0);
				} else {
					setTimeout(function() {
						Array.from(document.querySelectorAll('.active')).map(elem => change.element(elem).remove('active'));

						value.splice(0);
						key.splice(0);
					}, 800);
				}
			}
		}
	}

	handleHint() {
		const { hintSize } = this.state;

		if (hintSize > 1) {
			const cards = Array.from(document.querySelectorAll('.card'));

			cards.sort((a, b) => Math.random() - 0.5).map((card, i) => {
				if (i <= hintSize - 1) {
					card.textContent = card.getAttribute('data-value');
				}
			});

			setTimeout(() => {
				cards.map(card => {
					if (!card.className.includes('resolve')) {
						card.textContent = '';
					}
				});
			}, 1000);

			this.setState({
				hintSize: hintSize / 2
			});
		}
	}

	switchMenu() {
		this.setState({
			isMenuOpen: false
		});
	}

	render() {
		let currentCards = {
			value: [],
			key: []
		};

		return (
			<div className='playground' onClick={e => this.openCard(e, currentCards)}>
				<Menu handleHint={this.handleHint} resetState={this.resetState}/>
				<div className='cards'>{this.getCards()}</div>
			</div>
		);
	}
}

export default connector(Playground);