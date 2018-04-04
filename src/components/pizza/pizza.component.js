/**
 * Pizza Component
 * version 0.42
 */
import Component    from '../../component';
import PizzaForm    from './pizza.form.component';
import PizzaPane    from './pizza.pane.component';
import PizzaWaiting from './pizza.waiting.component';
import { STORE }    from '../../services/store.service';

class Pizza extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 60,
            ingredients: [],
            tags: [],
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
        Promise.all([
            STORE.ingredients(),
            STORE.tags(),
        ]).then(data => {
            if (!data.error) {
                const ingredients = data[0].results;
                const tags = data[1].results;

                this.updateState({ ingredients, tags, waiting: false });
            } else {
                ROUTER.navigateTo('/signin');
            } 
        }).catch(error => {
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
        const { size, ingredients, tags, waiting } = this.state;
        
        return [
            this.pizzaPane.update({ ingredients }),
            this.pizzaForm.update({ size, ingredients, tags, price: this.calculatePrice() }),
        ];
    }
}

export default Pizza;