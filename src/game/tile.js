import _ from 'lodash';

let tileId = 0;

export function createTile(value, row, column) {
	return {
		id: tileId++,
		value: value || 0,
		row: row || -1,
		column: column || -1,
		oldRow: -1,
		oldColumn: -1,
		classes: []
	};
}

export function isMerged(tile) {
	return _.isArray(tile.merged);
}

export function isNew(tile) {
	return tile.oldRow === -1;
}

export function hasMoved(tile) {
	return tile.oldRow !== -1 && (tile.oldRow !== tile.row || tile.oldColumn !== tile.column);
}

export function update(board) {
	const updateBoth = (tile, row, column, merged) => {
		tile = updatePositions(tile, row, column);
		tile = updateClasses(tile, merged);
		return tile;
	};

	return board.map((row, rowIndex) => {
		return row.map((tile, columnIndex) => {
			tile = updateBoth(tile, rowIndex, columnIndex, tile.merged);
			if (tile.merged) {
				tile.merged = tile.merged.map(tile => {
					return updateBoth(tile, rowIndex, columnIndex, false);
				});
			}
			return tile;
		});
	});
}

export function updateUndo(board, oldBoard) {
	return board.map(row => {
		return row.map(tile => {
			tile = updateUndoClasses(tile, searchTile(oldBoard, tile.id));
			return tile;
		});
	});
}

function updatePositions(tile, row, column) {
	return Object.assign(
		{},
		tile,
		{
			oldRow: tile.row,
			oldColumn: tile.column,
			row,
			column
		}
	);
}

function updateClasses(tile) {
	tile = Object.assign({}, tile);
	tile.classes = [
		`tile`,
		`tile-${tile.value}`,
		`row-${tile.row}`,
		`col-${tile.column}`
	];

	if (isMerged(tile)) {
		tile.classes.push('merged');
	} else if (isNew(tile)) {
		tile.classes.push('new');
	}

	return tile;
}

function updateUndoClasses(tile, oldTile) {
	tile = Object.assign({}, tile);
	tile.classes = _(tile.classes)
		.reject(item => item === 'new')
		.reject(className => className.indexOf('_from_') !== -1)
		.value();

	if (oldTile) {
		tile.classes.push(`row_from_${oldTile.row}_to_${tile.row}`);
		tile.classes.push(`column_from_${oldTile.column}_to_${tile.column}`);
	}

	return tile;
}

function searchTile(board, id) {
	return _(board).flatten().map(tile => tile.merged ? [tile, ...tile.merged] : tile).flatten().find({id});
}
