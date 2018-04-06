/**
 * Pizza Component
 * version 0.6
 */
import Component     from '../../component';
import PizzaForm     from './pizza.form.component';
import PizzaPane     from './pizza.pane.component';
import PizzaWaiting  from './pizza.waiting.component';
import { STORE }     from '../../services/store.service';
import { ROUTER }    from '../../services/router.service';
import { loadImage } from '../../utils';

class Pizza extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 60,
            ingredients: [],
            tags: [],
            pizza_sheet: null,
            waiting: true,
        };

        this.container = document.createElement('main');
        this.container.id = 'main';
        this.inner = document.createElement('div');
        this.inner.id = 'pane-form';
        
        this.pizzaForm = new PizzaForm({
            onChangeIngredient: this.onChangeIngredient.bind(this),
            onChangeTag: this.onChangeTag.bind(this),
            onChangeSize: this.onChangeSize.bind(this),
        });
        this.pizzaPane = new PizzaPane();
        this.pizzaWaiting = new PizzaWaiting();
    }

    init() {
        let ingredients = [];
        let tags = [];
        let pizza_sheet = null;

        Promise.all([
            STORE.ingredients(),
            STORE.tags(),
            loadImage('pizza_sheet', 'https://pizza-tele.ga/static/images/pizza.png'),
        ]).then(data => {
            // load ingredients, tags and image of pizza sheet
            if (data[0].error || data[1].error) ROUTER.navigateTo('/signin'); // 4** error Wrong authorization data
            ingredients = data[0].results;
            tags        = data[1].results;
            pizza_sheet = data[2].image;
            return data;
        }).then(data => {
            // preload images of ingredients
            const ingrs = data[0].results;
            const loadImages = ingrs.map(ingredient => loadImage(ingredient.name, 'https://pizza-tele.ga/'+ingredient.image_url));
            return Promise.all(loadImages);
        }).then(images => {
            // add images to ingredients ..
            images.forEach((image, i) => ingredients[i].image = image.image);
            // and updateState :)
            this.updateState({ ingredients, tags, pizza_sheet, waiting: false });
        }).catch(error => {
            // errors
            console.log(error);
            ROUTER.navigateTo('/503');
        });
    }

    onChangeIngredient(ingredients) {
        this.updateState({ ingredients });
    }

    onChangeTag(tags) {
        this.updateState({ tags });
    }

    onChangeSize(size) {
        this.updateState({ size });
    }

    calculatePrice() {
        let { size, ingredients } = this.state;
        let price = 0;
        ingredients = ingredients.filter(ingredient => ingredient.checked);
        for (let ingredient of ingredients) price += ingredient.price;
        switch (String(size)) 
        {
            case '30': price += 30; break;
            case '45': price += 45; break;
            case '60': price += 60; break;
        }
        return price;
    }

    render() {
        const { size, ingredients, tags, pizza_sheet, waiting } = this.state;
        
        return [
            this.pizzaPane.update({ pizza_sheet, size, ingredients }),
            this.pizzaForm.update({ size, ingredients, tags, price: this.calculatePrice() }),
        ];
    }
}

export default Pizza;