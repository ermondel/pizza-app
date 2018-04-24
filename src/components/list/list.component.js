/**
 * List Component
 * version 0.5
 */
import Component    from '../../component';
import { AUTH }     from '../../services/auth.service';
import { STOREAPI } from '../../services/store.api.service';
import { ROUTER }   from '../../services/router.service';
import { waitingbar } from '../../utils';

class List extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
			pizzas: [],
			waiting: true,
		};

        this.container = document.createElement('main');
		this.container.id = 'main';

		this.socket = null;
        this.socketCallbacks = {
            onopen: this.onOpenSocket.bind(this),
            onclose: this.onCloseSocket.bind(this),
            onmessage: this.onMessageSocket.bind(this),
            onerror: this.onErrorSocket.bind(this),
        };
        // window.addEventListener('unload', this.onWindowUnload.bind(this));
	}
	
	init() {
		STOREAPI.ticket(AUTH.token).then(ticket => {
			if (!ticket.success) throw new Error('auth');
			return new WebSocket(STOREAPI.websocketURL + '?key=' + ticket.token);
		}).then(socket => {
			this.socket = socket;
			Object.assign(this.socket, this.socketCallbacks);
			return STOREAPI.list(AUTH.token);
		}).then(list => {
			if (list.error) throw new Error('auth');
			this.updateState({ pizzas: list.results, waiting: false });
		}).catch(error => {
			this.socket.close();
			if (error.message == 'system') ROUTER.navigateTo('/503');
            if (error.message == 'auth') ROUTER.navigateTo('/signin');
            console.log(error);
		});
	}

	onOpenSocket() {
        console.log('websocket', 'connection open successful');
    }

    onCloseSocket(event) {
        if (event.wasClean) { console.log('websocket', 'connection close successful -');
        } else { console.log('websocket', 'disconnect'); }
        console.log('websocket', 'Code: ', event.code, 'reason: ', event.reason);
	}
	
	onErrorSocket(error) {
        console.log('websocket', 'error: ', error.message);
    }

    onMessageSocket(event) {
		const data = JSON.parse(event.data);
		let { pizzas } = this.state;

		if (data.event_name == 'CREATE_PIZZA') pizzas.unshift(data.data);
		if (data.event_name == 'ACCEPT_PIZZA') pizzas = pizzas.filter(pizza => !(data.data.indexOf(pizza.uuid)+1));
		
		this.updateState({ pizzas });
    }
    
    onWindowUnload(e) {
        this.socket.close();
	}
	
	onBeforeUnmount() {
		this.socket.close();
	}

    render() {
		const { waiting, pizzas } = this.state;

		let content = '';

		if (pizzas.length) {
			content = `<div class="pizzas">` + pizzas.map(pizza => {
				return `
				<div class="pizza">
					<div class="pizza-img">
						<a href="${STOREAPI.domen + pizza.img_url}" tabindex="0" title="${pizza.name}, ${pizza.description}">
							<img src="${STOREAPI.domen + pizza.img_url}" alt="${pizza.name}, ${pizza.description}">
						</a>
					</div>
		        	<time class="pizza-time">00:00:00</time>
		        	<div class="pizza-queue">#1</div>
		        	<div class="pizza-eta">ETA: # min</div>
		        	<div class="pizza-price">$ ${pizza.price}</div>
	        	</div>`;
			}).join('') + `</div>`;
		} else {
			content = 'No pizzas in the queue.';
		}

		return !waiting ? content : waitingbar;
	}
}

export default List;
