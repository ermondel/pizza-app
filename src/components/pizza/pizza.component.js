/**
 * Pizza Component
 * version 0.79
 */
import Component    from '../../component';
import PizzaForm    from './pizza.form.component';
import PizzaPane    from './pizza.pane.component';
import { AUTH }     from '../../services/auth.service';
import { STOREAPI } from '../../services/store.api.service';
import { ROUTER }   from '../../services/router.service';
import { waitingbar, loadImage, canvasToFile } from '../../utils';

class Pizza extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size        : 60,
            ingredients : [],
            tags        : [],
            pizza_sheet : null,
            waiting     : true,
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
        let nextState = {
            ingredients : [],
            tags        : [],
            pizza_sheet : null,
            waiting     : true,
        };

        loadImage('pizza_sheet', STOREAPI.pizzaSheetURL).then(img => {
            return img.image;
        }).then(image => {
            nextState.pizza_sheet = image;
            return STOREAPI.ingredients(AUTH.token);
        }).then(ingredients => {
            if (ingredients.error) throw new Error('auth');
            nextState.ingredients = ingredients.results;
            return STOREAPI.tags(AUTH.token);
        }).then(tags => {
            if (tags.error) throw new Error('auth');
            nextState.tags = tags.results;
            return Promise.all(nextState.ingredients.map(ingr => loadImage(ingr.name, STOREAPI.domen + ingr.image_url)));
        }).then(ingredientsImages => {
            ingredientsImages.forEach((img, i) => nextState.ingredients[i].image = img.image);
            nextState.waiting = false;
            this.updateState(nextState);
        }).catch(error => {
            if (error.message == 'system') ROUTER.navigateTo('/503');
            if (error.message == 'auth') ROUTER.navigateTo('/signin');
            console.log(error);
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

    onSubmit(name, description) {
        const { size, ingredients, tags } = this.state;

        // ingredients IDs
        const ingredientsChecked = ingredients.filter(ingredient => ingredient.checked);
        let ingredientsIDs = ingredientsChecked.map(ingredient => ingredient.id);
        ingredientsIDs = JSON.stringify(ingredientsIDs);

        // tags IDs
        const tagsChecked = tags.filter(tag => tag.checked);
        let tagsIDs = tagsChecked.map(tag => tag.id);
        tagsIDs = JSON.stringify(tagsIDs);

        canvasToFile(this.canvas).then(image => {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('size', Number(size));
            formData.append('ingredients', ingredientsIDs);
            formData.append('tags', tagsIDs);
            formData.append("image", image, "my_canvas.png");
            return formData;
        }).then(formData => {
            return STORE.create(formData);
        }).then(response => {
            if (response.success) {
                ROUTER.navigateTo('/pizza/successful');
            } else {
                console.log(response.error);
            }
        }).catch(error => {
            console.log(error.name + ': ' + error.message);
            ROUTER.navigateTo('/503');
        });
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