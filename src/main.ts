import './style.css';
import app, { renderer } from './app';

document.querySelector<HTMLDivElement>('#app')!.appendChild(renderer(app));
