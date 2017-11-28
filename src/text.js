import React from 'react';
import { Link } from 'react-router-dom';

module.exports = {
	'titleScreen': <span>You can <Link to={`${process.env.PUBLIC_URL}/level`}><button className='play'>play</button></Link> the game with default cards or <Link to={`${process.env.PUBLIC_URL}/create`}><button className='create'>create</button></Link> your own (for example, for learning words).</span>,
    'levels' : {
        'easy': 'easy',
        'medium': 'medium',
        'hard': 'hard'
    },
    'buttons': {
		'add': 'add',
		'addNew': 'add new word',
		'play': 'play',
        'accept': 'accept changes',
		'create': <span>You can also <Link to={`${process.env.PUBLIC_URL}/user_cards`}><button className="create">create</button></Link> your own cards</span>,
		'createForTablet': <span>Or <Link to={`${process.env.PUBLIC_URL}/user_cards`}><button className="create">create</button></Link> your own cards</span>,
		'playMenu': <span>You can also  <Link to={`${process.env.PUBLIC_URL}/level`}><button className="play">play</button></Link> the game with ready-made cards</span>,
		'playForTablet': <span>Or  <Link to={`${process.env.PUBLIC_URL}/level`}><button className="play">play</button></Link> with standard cards</span>
    },
	'form': {
    	'word': 'word',
    	'meaning': 'meaning'
	},
	'result': {
		'congrats': 'Congratulations. You won.',
		'replay': <span><Link to={`${process.env.PUBLIC_URL}/level`}><button className="play">play again</button></Link> \ <Link to={`${process.env.PUBLIC_URL}/create`}><button className="create">create your own cards</button></Link></span>,
		'replayForTablet': <span><Link to={`${process.env.PUBLIC_URL}/level`}><button className="play">play again</button></Link><Link to={`${process.env.PUBLIC_URL}/create`}><button className="create">create your own cards</button></Link></span>
	}
};