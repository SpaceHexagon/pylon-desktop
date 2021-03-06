import React from 'react';
import CellIcon from './cell-icon.js';

export default class ChunkMenu extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		return (
			<div className="chunk-menu">
        {this.props.cells.map(function (cell, i) {
          var coords = [i%6, 0, Math.floor(i/6)],
							offset = (coords[0] %2 == 0 ? "" : "offset");
            return <CellIcon key={i} offset={offset} coords={coords} />;
        })}
			</div>
		);
	}
}

ChunkMenu.defaultProps = {
  cells: []
}
