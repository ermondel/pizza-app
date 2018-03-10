/**
 * component.js
 * version 0.1
 */
class Component {
	constructor(props) {
		this.state = {};
		this.props = props || {};
		this.container = null;
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		return this.display();
	}

	update(nextProps) {
		this.props = Object.assign({}, this.props, nextProps);
		return this.display();
	}

	display() {
		const children = this.render();

		this.container.innerHTML = '';

		if (typeof children === 'string') {
      		this.container.innerHTML = children;
    	} else if (Array.isArray(children)) {
    		for (let child of children) child && this.container.appendChild(child);
    	} else {
      		this.container.appendChild(children);
    	}
    	
		return this.container;
	}

	//
	render() {}
}

export default Component;
