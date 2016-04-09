import React from 'react';
import Applet from './applet.js';


export default class FileBrowser extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {name: 'File Browser'}
    }
    setName(name) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({name: name});
    }
	render(){
		return (
			<section className="applet file-browser">

			</section>
		);
	}
}
