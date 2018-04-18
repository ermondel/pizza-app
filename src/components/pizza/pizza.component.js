/**
 * Pizza Component
 * version 0.744
 */
import Component      from '../../component';
import PizzaForm      from './pizza.form.component';
import PizzaPane      from './pizza.pane.component';
import { STORE }      from '../../services/store.service';
import { ROUTER }     from '../../services/router.service';
import { loadImage }  from '../../utils';
import { waitingbar } from '../../utils';

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
            onSubmit: this.onSubmit.bind(this),
        });

        this.canvas = document.createElement('canvas');
        this.canvas.width  = 320;
        this.canvas.height = 320;
        this.ctx = this.canvas.getContext('2d');

        this.pizzaPane = new PizzaPane({
            canvas: this.canvas,
            ctx: this.ctx,
        });
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

    onChangeIngredient(id, checked) {
        const { ingredients } = this.state;
        this.updateState({ ingredients: this.checkedById(ingredients, id, checked) });
    }

    onChangeTag(id, checked) {
        const { tags } = this.state;
        this.updateState({ tags: this.checkedById(tags, id, checked) });
    }

    onChangeSize(size) {
        this.updateState({ size });
    }

    onSubmit() {
        this.canvas.toBlob(data => console.log(data));
    }

    checkedById(fields, id, checked) {
        for (let field of fields) {
            if (field.id == id) { field.checked = checked; break; }
        }
        return fields;
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
        
        const ingredientsChecked = ingredients.filter(ingredient => ingredient.checked);
        
        return !waiting ? [
            this.pizzaPane.update({ pizza_sheet, size, ingredients: ingredientsChecked }),
            this.pizzaForm.update({ size, ingredients, tags, price: this.calculatePrice() }),
        ] : waitingbar;
    }
}

export default Pizza;