import React from 'react';
import connector from '../connector';
import { buttons, form } from '../text';
import Alternative from './Alternative';
import classNames from 'classnames';

class Creator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			word: null,
			meaning: null,
			isFormEmpty: true
		};

		this.addWord = this.addWord.bind(this);
		this.checkForm = this.checkForm.bind(this);
	}

	componentDidMount() {
		document.querySelector('.memory-game').classList.add('create');
	}

	componentWillUnmount() {
		document.querySelector('.memory-game').classList.remove('create');
	}

	checkForm() {
		this.setState({
			isFormEmpty: !(this.state.word && this.state.meaning)
		});
	}

	addWord(e) {
		e.preventDefault();

		if (this.state.word && this.state.meaning) {
			this.props.userCards.push({
				word: this.state.word,
				meaning: this.state.meaning
			});

			localStorage.setItem('userCards', JSON.stringify(this.props.userCards));
			this.props.history.push(`${process.env.PUBLIC_URL}/user_cards`);
		}
	}

    render() {
		return (
			<div className='creator'>
				<form>
					<label dangerouslySetInnerHTML={{ __html: form.word}}/>
					<input onChange={e => this.setState({word: e.target.value})} type='text'/>
					<label dangerouslySetInnerHTML={{ __html: form.meaning}}/>
					<textarea onChange={e => this.setState({meaning: e.target.value})} rows='3' name='text'/>
					<button className={classNames('add', {
						'disabled-link': this.state.isFormEmpty
					})} onMouseOver={this.checkForm} onClick={this.addWord}>{buttons.add}</button>
				</form>
				<Alternative type='play'/>
			</div>
		);
	}
}

export default connector(Creator);