/**
 * is-authorized.js
 */

export const isAuthorized = () => {
    return !!localStorage.getItem('pizza-app');
}