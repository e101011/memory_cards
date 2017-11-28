import React from 'react';
import connector from '../connector';
import { result } from '../text';
import { cardsSettings } from '../heplers/cards-data';
import { tablet } from '../heplers/window-size';

class Result extends React.Component {
	render() {
		if (!this.props.clicks) this.props.history.push(`${process.env.PUBLIC_URL}/`);

		const numberOfClicks = this.props.level === 'custom' ? this.props.userCards.length * 2 : cardsSettings[this.props.level].number;

		return (
			<div className='result'>
				<div className='congrats' dangerouslySetInnerHTML={{ __html: result.congrats }}/>
				<div className='score'>
					<span>{this.props.clicks} clicks</span>
					<span>{this.props.time}</span>
					<span>Minimal number of clicks for {this.props.level} level: {numberOfClicks}</span>
				</div>
				<div className="replay">{tablet ? result.replayForTablet : result.replay}</div>
			</div>
		);
	}
}

export default connector(Result);