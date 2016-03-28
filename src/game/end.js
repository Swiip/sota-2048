import _ from 'lodash';

import {size, end} from './conf';

const deltaX = [-1, 0, 1, 0];
const deltaY = [0, -1, 0, 1];

export function hasWon(cells) {
  return _.flatten(cells.map(row => row.filter(tile => tile.value >= end))).length > 0;
}

export function hasLost(cells) {
  let canMove = false;
  _.range(size).forEach(row => {
    _.range(size).forEach(column => {
      canMove |= cells[row][column].value === 0;
      _.range(4).forEach(direction => {
        const newRow = row + deltaX[direction];
        const newColumn = column + deltaY[direction];
        if (newRow >= 0 && newRow < size && newColumn >= 0 && newColumn < size) {
          canMove |= cells[row][column].value === cells[newRow][newColumn].value;
        }
      });
    });
  });
  return !canMove;
}
