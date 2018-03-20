import App from './app';
import { routes } from './routes';
new App({ container: document.getElementById('body'), routes }).init();