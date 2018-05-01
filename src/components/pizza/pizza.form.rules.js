export const pizzaFormRules = 
{
    name: {
        required : { rule: true,     message: "Name is required." },
        min      : { rule: 3,        message: 'Name is not valid. Min length is 3.' },
        max      : { rule: 24,       message: 'Name is not valid. Max length is 24.' },
        pattern  : { rule: /^\w+$/,  message: 'Name must be alphanumeric word.' },
    },
    description: {
        max      : { rule: 124,      message: 'Description is not valid. Max length is 124.' },
    },
    ingredient: {
        checked  : { rule: true,     message: 'Choose ingredients. Min 1. Max 6.' },
    },
};