import './style.css';
import { app } from './app';

document.querySelector<HTMLDivElement>('#app')!.appendChild(app.view);
