import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';

const menu = document.querySelector<HTMLDivElement>('#menu');

const playerColor = menu
    ?.querySelector<HTMLDivElement>('#settings')
    ?.querySelector<HTMLSelectElement>('#player-select')?.value;

menu?.querySelector<HTMLDivElement>('#settings')
    ?.querySelector<HTMLButtonElement>('#open-dialog')
    ?.addEventListener('click', async () => {
        const execCommandPath = await open({
            multiple: false
        });

        if (execCommandPath != null) {
            invoke('main_handler', { path: execCommandPath });
        }
    });

export { playerColor };
