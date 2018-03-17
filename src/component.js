/**
 * Component
 * version 1.7
 */
class Component {
	constructor(props) {
		this.state = {};
		this.props = props || {};
		this.container = null;
		this.inner = null;
	}

	updateState(nextState) {
		this.onBeforeUpdateState(nextState);
		this.state = Object.assign({}, this.state, nextState);
		this.onAfterUpdateState(nextState);
		return this.display();
	}

	update(nextProps) {
		this.onBeforeUpdate(nextProps);
		this.props = Object.assign({}, this.props, nextProps);
		this.onAfterUpdate(nextProps);
		return this.display();
	}

	display() {
		const html = this.render();

		this.container.innerHTML = '';

		let box = this.inner || this.container;

		if (typeof html === 'string') {
      		box.innerHTML = html;
    	} else if (Array.isArray(html)) {
    		for (let elem of html) elem && box.appendChild(elem);
    	} else {
      		box.appendChild(html);
    	}

		this.inner && this.container.appendChild(box);
		
		return this.container;
	}

	//

	render() {}

	onBeforeUpdateState(nextState) {}

	onAfterUpdateState(nextState) {}

	onBeforeUpdate(nextProps) {}

	onAfterUpdate(nextProps) {}
}

export default Component;
