/**
 * List Component
 * version 0.8
 */
import Component    from '../../component';
import { AUTH }     from '../../services/auth.service';
import { STOREAPI } from '../../api/store.api';
import { ROUTER }   from '../../services/router.service';
import { waitingbar, USD } from '../../utils/util';
import { getETA, minuteTimer, HHMMSS } from '../../utils/time';

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
    	window.addEventListener('unload', this.onWindowUnload.bind(this));
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
			let pizzas = list.results;
			pizzas.sort((a, b) => +(a.time_prepared < b.time_prepared) || +(a.time_prepared === b.time_prepared) - 1);
			this.updateState({ pizzas, waiting: false });
			this.timerETA();
		}).catch(error => {
			this.closeSocket();
			if (error.message == 'system') ROUTER.navigateTo('/503');
            if (error.message == 'auth') ROUTER.navigateTo('/signin');
            console.log(error);
		});
	}

	onOpenSocket(e) {
		console.log('websocket', 'connection open successful');
    }

    onCloseSocket(event) {
        if (event.wasClean) { console.log('websocket', 'connection close successful');
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
        this.closeSocket();
	}
	
	onBeforeUnmount() {
		this.closeSocket();
	}

	timerETA() {
		if (this.socket && (this.socket.readyState == 0 || this.socket.readyState == 1)) {
			minuteTimer().then(result => {
				this.updateState();
				this.timerETA();
			});
		}
	}

	closeSocket() {
		if (this.socket && (this.socket.readyState == 0 || this.socket.readyState == 1)) {
			this.socket.close();
		}
	}

    render() {
		const { waiting, pizzas } = this.state;

		let content = '';

		if (pizzas.length) {
			content = pizzas.map((pizza, index) => {
				let ETA = getETA(new Date(), pizza.time_prepared), pizzaETA = '';
				pizzaETA = ETA.ready ? `<span class="${ETA.cssclass}">ready</span>` : `ETA: <span class="${ETA.cssclass}">${ETA.readable}</span>`;

				return `
				<div class="pizza">
					<div class="pizza-img">
						<a href="${STOREAPI.domen + pizza.img_url}" tabindex="0" title="${pizza.name}, ${pizza.description}">
							<img src="${STOREAPI.domen + pizza.img_url}" alt="${pizza.name}, ${pizza.description}">
						</a>
					</div>
		        	<time class="pizza-time"><span title="pizza create time">ct</span> <span class="time">${HHMMSS(pizza.created_date)}</span></time>
		        	<div class="pizza-queue">#${pizzas.length - index}</div>
		        	<div class="pizza-eta">${pizzaETA}</div>
		        	<div class="pizza-price">${USD(pizza.price)}</div>
	        	</div>`;
			}).join('');
		} else {
			content = `
				<div class="pizza">
					<div class="pizza-btn-link">
						<a href="#/pizza" tabindex="0" title="Add pizza"><span>+ Add</span></a>
					</div>
		        	<div class="pizza-no">No pizzas in the queue.</div>
	        	</div>`;
		}

		return !waiting ? `<div class="pizzas">` + content + `</div>` : waitingbar;
	}
}

export default List;
