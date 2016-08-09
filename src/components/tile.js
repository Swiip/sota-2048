import React, {Component, PropTypes} from 'react';

export class TileView extends Component {
  render() {
    const {tile} = this.props;
    return <span id={`tile-${tile.id}`} className={tile.classes.join(' ')}>{tile.value}</span>;
  }
}

TileView.propTypes = {
  tile: PropTypes.object.isRequired
};
