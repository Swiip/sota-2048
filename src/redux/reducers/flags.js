import {HAS_WON, HAS_LOST, CONTINUE, START} from '../actions';
import {hasWon, hasLost} from '../../game/end';

function getInitialState() {
	return {
		won: false,
		beyond: false,
		lost: false
	};
}

export function flags(state = getInitialState(), action) {
	switch (action.type) {
		case START: {
			return getInitialState();
		}
		case HAS_WON: {
			return Object.assign(
				{},
				state,
				{won: hasWon(action.board)}
			);
		}
		case HAS_LOST: {
			return Object.assign(
				{},
				state,
				{lost: hasLost(action.board)}
			);
		}
		case CONTINUE: {
			return Object.assign(
				{},
				state,
				{beyond: true}
			);
		}
		default: {
			return state;
		}
	}
}
