import React from 'react';
import PropTypes from 'prop-types';
import connector from '../connector';
import classNames from 'classnames';
import LevelSelection from './LevelSelection';
import Alternative from './Alternative';
import { change, cardsSettings } from '../heplers/cards-data';
import { tablet} from '../heplers/window-size';

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			seconds: 1,
			minutes: 0,
			time: '00:00',
			open: false,
			close: true,
			isClass: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.timer = this.timer.bind(this);
		this.setCounter = this.setCounter.bind(this);
		this.setStyle = this.setStyle.bind(this);
	}

	componentDidMount() {
		setInterval(this.timer, 1000);
		this.setCounter();
	}

	setCounter(length = document.querySelectorAll('.card').length) {
		let counter = 0;

		do {
			length = length / 2;
			counter++;
		} while (length > 1);

		this.setState({ counter });
	}

	setStyle(param) {
		document.querySelector('.memory-game').style.marginLeft = param ? 'calc(100% + 80px)' : '';
		document.querySelector('.memory-game').style.height = param ? '100%' : '';
		document.querySelector('.memory-game').style.overflow = param ? 'hidden' : '';
	}

	handleClick(e) {
		if (e.target.className === 'replay') {
			this.setState({
				seconds: 0,
				minutes: 0,
				time: '00:00'
			});

			Array.from(document.querySelectorAll('.card')).map(elem => change.element(elem).remove('resolve').remove('active'));

			this.setCounter();

			this.props.resetState();
			this.props.increaseClicks(0);
		}

		if (e.target.className.includes('menu-button') || e.target.className.includes('close-menu')) {
			this.setState({
				open: !this.state.open,
				close: !this.state.close,
				isClass: true
			});

			if (tablet && open) {
				document.querySelector('.cards').classList.toggle('tablet-menu-open');
			}

			if (!this.state.open && document.querySelector('.memory-game.playground-custom-page')) {
				this.setStyle(true);
			} else {
				setTimeout(() => this.setStyle(false), 950);
			}
		}

		if (e.target.tagName === 'A') {
			this.setState({
				open: false,
				close: true,
				seconds: 0,
				minutes: 0,
				time: '00:00'
			});

			this.setCounter(this.props.level === 'custom' ? this.props.userCards.length : cardsSettings[e.target.textContent].number);
			this.setStyle(false);
			document.querySelector('.cards').classList.remove('tablet-menu-open');
		}

		if (e.target.className === 'create') {
			this.setStyle(false)
		}

		if (e.target.className === 'hint' && this.state.counter > 0) {
			this.setState({
				counter: this.state.counter - 1
			});
		}
	}

	timer() {
		let { seconds, minutes} = this.state;

		if (seconds === 60) {
			seconds = 0;
			minutes++;
		}

		const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
		const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

		this.setState({
			seconds: seconds + 1,
			minutes,
			time: `${displayMinutes}:${displaySeconds}`
		});
	}

	render() {
		const {open, close, isClass} = this.state;

		const minW = 690;
		const minH = 500;

		const innerWidth = window.innerWidth;
		const innerHeight = window.innerHeight;

		const isTablet = innerWidth < minW || innerHeight < minH;

		const tablet = document.documentElement.clientWidth <= 690 || document.documentElement.clientHeight <= 500;

		return (
			<div className='menu'>
				<div className={classNames(
					'left-menu', {
						open: isClass && open,
						close: isClass && close
					}
				)} onClick={this.handleClick}>
					<div className='menu-body'>
						{ open ? <LevelSelection/> : null }
						{ open ? <Alternative type='create'/> : null}
						{tablet ? <div className="close-menu"></div> : null}
					</div>
					<button className='menu-button'>Menu</button>
				</div>

				<div className='top-menu' onClick={this.handleClick}>
					{
						isTablet ? <button className='submenu menu-button'>Menu</button> : null
					}
					<button className='hint' onClick={this.props.handleHint}>Hint: {this.state.counter}</button>
					<button className='replay'>Replay</button>
					<button>Clicks: {this.props.clicks}</button>
					<button className='time'>{this.state.time}</button>
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	handleHint: PropTypes.func.isRequired,
	resetState: PropTypes.func.isRequired
};

export default connector(Menu);