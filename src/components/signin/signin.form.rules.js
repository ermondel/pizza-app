export const signinFormRules = 
{
    username: {
        required : { rule: true,       message: 'Username is required.' },
        min      : { rule: 2,          message: 'Username is not valid. Min length is 2.' },
        max      : { rule: 24,         message: 'Username is not valid. Max length is 24.' },
        pattern  : { rule: /^\w+$/,    message: 'Username must be alphanumeric word.' },
    },
    password: {
        required : { rule: true,       message: 'Password is required.'},
        min      : { rule: 8,          message: 'Password is not valid. Min length is 8.' },
        max      : { rule: 24,         message: 'Password is not valid. Max length is 24.' },
    },
};