/**
 * Pizza Component
 * version 0.951
 */
import Component    from '../../component';
import PizzaForm    from './pizza.form.component';
import PizzaPane    from './pizza.pane.component';
import { AUTH }     from '../../services/auth.service';
import { STOREAPI } from '../../api/store.api';
import { ROUTER }   from '../../services/router.service';
import { waitingbar, loadImage, canvasToFile, USD } from '../../utils/util';

class Pizza extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size        : 60,
            ingredients : [],
            tags        : [],
            pizza_sheet : null,
            waiting     : true,
            errors      : [],
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
            onErrorValidate: this.onErrorValidate.bind(this),
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
        this.updateState({ ingredients: this.checkedById(ingredients, id, checked), errors: [] });
    }

    onChangeTag(id, checked) {
        const { tags } = this.state;
        this.updateState({ tags: this.checkedById(tags, id, checked), errors: [] });
    }

    onChangeSize(size) {
        this.updateState({ size, errors: [] });
    }

    onErrorValidate(errors) {
        this.updateState({ errors });
    }

    onSubmit(name, description) {
        this.updateState({ waiting: true });

        canvasToFile(this.canvas).then(img => {
            return STOREAPI.create(AUTH.token, this.pizzaFormData(name, description, img));
        }).then(response => {
            if (response.success) {
                ROUTER.navigateTo('/pizza/successful');
            } else {
                this.updateState({ errors: response.validations, waiting: false });
            }
        }).catch(error => {
            if (error.message == 'system') ROUTER.navigateTo('/503');
            this.updateState({ errors: [ error.message ], waiting: false });
        });
    }

    /**
     * Get FormData
     * @param string name 
     * @param string description 
     * @param blob image 
     */
    pizzaFormData(name, description, image) {
        const { size, ingredients, tags } = this.state;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('size', Number(size));
        formData.append('description', description);
        formData.append('image', image, "my_canvas.png");
        formData.append('tags', JSON.stringify(this.getCheckedIDs(tags)));
        formData.append('ingredients', JSON.stringify(this.getCheckedIDs(ingredients)));

        return formData;
    }

    /**
     * Get IDs from list (elem of ID must be checked)
     * @param array list 
     */
    getCheckedIDs(list) {
        let result = [];
        for (let elem of list) if (elem.checked) result.push(elem.id);
        return result;
    }

    /**
     * Switch checked state of lists element by id
     * @param array list 
     * @param int id 
     * @param boolean checked 
     */
    checkedById(list, id, checked) {
        for (let elem of list) if (elem.id == id) { elem.checked = checked; break; }
        return list;
    }

    calculatePrice() {
        let { size, ingredients } = this.state;

        let sum = 0;
        for (let ingredient of ingredients) if (ingredient.checked) sum += ingredient.price;

        return USD(size / 5 + sum);
    }

    render() {
        const { size, ingredients, tags, pizza_sheet, waiting, errors } = this.state;
        
        const ingredientsChecked = ingredients.filter(ingredient => ingredient.checked);
        
        return !waiting ? [
            this.pizzaPane.update({ pizza_sheet, size, ingredients: ingredientsChecked }),
            this.pizzaForm.update({ size, ingredients, tags, price: this.calculatePrice(), errors }),
        ] : waitingbar;
    }
}

export default Pizza;