/**
 * Polygon Component
 * version 0.1
 */
import Component from '../../component';
import { STORE } from '../../services/store.service';

class Polygon extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement('div');
        this.container.id = 'polygon-container';
    }

    init() {
        STORE.ticket().then(response => {
            if (response.success) {
                console.log(response);
                const socket = new WebSocket("wss://pizza-tele.ga/ws?key=" + response.token);
                socket.onopen = () => {
                    console.log('- connection OPEN successful -');
                };
                socket.onclose = event => {
                    if (event.wasClean) {
                        console.log('- connection CLOSE successful -');
                    } else {
                        console.log('- disconnection -');
                    }
                    console.log('Code: ', event.code, 'reason: ', event.reason);
                };
                socket.onmessage = (event) => {
                    console.log('data: ', event.data);
                };
                socket.onerror = (error) => {
                    console.log('error: ', error.message);
                };
                // socket.close();
            }
        }).catch(error => {
            console.log('-START-');
            console.log(error.name + ': ' + error.message);
            console.log('-END-');
        });
    }

    render() {
        return `this is Polygon`;
    }
}

export default Polygon;