import React, {Component, PropTypes} from 'react';

export class GameEndOverlay extends Component {
	render() {
		const handlerRestart = this.props.onRestart;
		const handlerContinue = this.props.onContinue;
		let contents = null;
		if (this.props.won && !this.props.beyond) {
			contents = 'Good Job!';
		}
		if (this.props.lost) {
			contents = 'Game Over';
		}
		if (contents === null) {
			return null;
		}
		return (
			<div className="overlay">
				<p className="message">{contents}</p>
				<button className="tryAgain" onClick={handlerRestart}>
					Try again
				</button>
				{
					this.props.won && !this.props.lost ?
						<button className="tryAgain" onClick={handlerContinue}>Continue</button> :
						null
				}
			</div>
		);
	}
}

GameEndOverlay.propTypes = {
	won: PropTypes.bool.isRequired,
	lost: PropTypes.bool.isRequired,
	beyond: PropTypes.bool.isRequired,
	onRestart: PropTypes.func.isRequired,
	onContinue: PropTypes.func.isRequired
};
