import { open } from '@tauri-apps/api/dialog';

const menu = document.querySelector<HTMLDivElement>('#menu');
const settings = menu?.querySelector<HTMLDivElement>('#settings');

const playerColor = () =>
    settings?.querySelector<HTMLSelectElement>('#player-select')?.value ??
    'red';

let execCommandPath: string | Array<string> | null = null;
settings
    ?.querySelector<HTMLButtonElement>('#open-dialog')
    ?.addEventListener('click', async () => {
        const path = await open({
            multiple: false
        });

        if (path != null) {
            execCommandPath = path;
        }
    });

export { playerColor, execCommandPath };
