import './style.css';
import app, { renderer } from './app';

import { open } from '@tauri-apps/api/dialog';
import { emit } from '@tauri-apps/api/event';

document
    .querySelector<HTMLDivElement>('#settings')
    ?.querySelector<HTMLButtonElement>('#open-dialog')
    ?.addEventListener('click', async () => {
        const execCommandPath = await open({
            multiple: false
        });

        if (execCommandPath != null) {
            emit('execCommandPath', execCommandPath);
        }
    });

document.querySelector<HTMLDivElement>('#app')!.appendChild(renderer(app));
