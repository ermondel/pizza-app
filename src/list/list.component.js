/**
 * list.component.js
 * version 0.1
 */
import Component from '../component';
import listPictures from './list-pictures/*';

class List extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
	}

	render() {
		return `
<header>
	<nav>
		<div id="box-logo"><a href="/" tabindex="0" aria-label="home"><img src="${listPictures['logo.png']}" alt="logotype"></a></div>
		<div id="box-time"><span>12:12:12</span></div>
		<div id="box-login"><a href="#/signin" tabindex="0">Login</a></div>
	</nav>
</header>

<main>
	<div id="wrapper-pizza-add"><button class="pizza-add" tabindex="0">+ <span>Add pizza</span></button></div>

	<div class="pizzas">
	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza1.jpg']}" alt="Neapolitan Pizza"></a></div>
		<time class="pizza-time">10:48:01</time>
		<div class="pizza-queue" >#1</div>
		<div class="pizza-eta" >ETA: 1 min</div>
		<div class="pizza-price" >$9.99</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza2.jpg']}" alt="Chicago Pizza"></a></div>
		<time class="pizza-time">10:55:21</time>
		<div class="pizza-queue" >#2</div>
		<div class="pizza-eta" >ETA: 7 min</div>
		<div class="pizza-price" >$12.12</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza3.jpg']}" alt="New York Style Pizza"></a></div>
		<time class="pizza-time">10:59:30</time>
		<div class="pizza-queue" >#3</div>
		<div class="pizza-eta" >ETA: 3 min</div>
		<div class="pizza-price" >$14.69</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza4.jpg']}" alt="Sicilian Pizza"></a></div>
		<time class="pizza-time">11:11:07</time>
		<div class="pizza-queue" >#4</div>
		<div class="pizza-eta" >ETA: 10 min</div>
		<div class="pizza-price" >$20.11</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza5.jpg']}" alt="Greek Pizza"></a></div>
		<time class="pizza-time">11:18:34</time>
		<div class="pizza-queue" >#5</div>
		<div class="pizza-eta" >ETA: 12 min</div>
		<div class="pizza-price" >$21.33</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza6.jpg']}" alt="California Pizza"></a></div>
		<time class="pizza-time">11:27:42</time>
		<div class="pizza-queue" >#6</div>
		<div class="pizza-eta" >ETA: 9 min</div>
		<div class="pizza-price" >$8.12</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza7.jpg']}" alt="Tomato Pie"></a></div>
		<time class="pizza-time">11:33:45</time>
		<div class="pizza-queue" >#7</div>
		<div class="pizza-eta" >ETA: 11 min</div>
		<div class="pizza-price" >$12.12</div>
	</div>

	<div class="pizza">
		<div class="pizza-img"><a href="#" tabindex="0"><img src="${listPictures['pizza8.jpg']}" alt="Alternative Pizza Type"></a></div>
		<time class="pizza-time">11:42:01</time>
		<div class="pizza-queue" >#8</div>
		<div class="pizza-eta" >ETA: 7 min</div>
		<div class="pizza-price" >$7.40</div>
	</div>
	</div>
</main>

<footer>
	<div id="footer-inner">
		<div id="footer-address">
			<address>Kottans, Kottans Str. 1, <a href="tel:577-788-87" tabindex="0">tel. 577-788-87</a></address>
		</div>
    	<div id="footer-copyright">
    		Pizza Manager © 2018
    	</div>
	</div>
</footer>`;
	}
}

export default List;
