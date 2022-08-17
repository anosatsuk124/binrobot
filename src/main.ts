import './style.css';
import { app } from './app/mod';

document.querySelector<HTMLDivElement>('#app')!.appendChild(app.view);
