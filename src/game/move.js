import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

export function move(board, direction) {
	// 0 -> left, 1 -> up, 2 -> right, 3 -> down
	_.times(direction, () => {
		board = rotateLeft(board);
	});
	const moveResult = moveLeft(board);
	board = moveResult.board;
	_.times(size - direction, () => {
		board = rotateLeft(board);
	});
	return {board, changed: moveResult.changed};
}

function rotateLeft(board) {
	return board.map((row, rowIndex) => {
		return row.map((cell, columnIndex) => {
			return board[columnIndex][size - rowIndex - 1];
		});
	});
}

function moveLeft(board) {
	let changed = false;
	board = board.map(row => {
		const currentRow = row.filter(tile => tile.value !== 0);
		return _.range(size).map(target => {
			let targetTile;
			if (currentRow.length > 0) {
				targetTile = Object.assign(
					{},
					currentRow.shift(),
					{merged: null}
				);
			} else {
				targetTile = createTile();
			}
			if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
				const tile1 = targetTile;
				tile1.merged = null;
				targetTile = createTile(targetTile.value);
				targetTile.merged = [];
				targetTile.merged.push(tile1);
				const tile2 = Object.assign(
					{},
					currentRow.shift(),
					{merged: null}
				);
				targetTile.value += tile2.value;
				targetTile.merged.push(tile2);
			}
			changed |= targetTile.value !== row[target].value;
			return targetTile;
		});
	});
	return {board, changed};
}
