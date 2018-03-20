/**
 * List Component
 * version 0.1
 */
import Component from '../../component';

class List extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'list-component';
    }

    render() {
        return '<p>Pizza App :: List Component</p>';
    }
}

export default List;
