const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const signupFormRules = 
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
    password_repeat: {
        required : { rule: true,       message: 'Pass repeat is required.'},
        equal    : { rule: 'password', message: 'Passwords are not equivalent.'},
    },
    email: {
        required : { rule: true,       message: 'Email is required.'},
        min      : { rule: 6,          message: 'Email is not valid. Min length is 6.' },
        max      : { rule: 24,         message: 'Email is not valid. Max length is 24.' },
        pattern  : { rule: emailreg,   message: 'Should be valid email.' },
    },
    store_password: {
        required : { rule: true,       message: 'Store pass is required.'},
        min      : { rule: 8,          message: 'Store pass is not valid. Min length is 8.' },
        max      : { rule: 24,         message: 'Store pass is not valid. Max length is 24.' },
    },
};