import { invoke } from '@tauri-apps/api';
import * as PIXI from 'pixi.js';
import gameMain from './game/mod';
import { execCommandPath, playerColor } from './menu/mod';
import { v4 as uuidv4 } from 'uuid';

type App = {
    game: PIXI.Application;
};

type Settings = {
    color: string;
    id: string;
};

const app: App = {
    game: new PIXI.Application({
        width: 380,
        height: 300,
        backgroundColor: 0xaaaaaa,
        resolution: window.devicePixelRatio || 1
    })
};

const renderer = (app: App): HTMLElement => {
    return document.createElement('div').appendChild(app.game.view);
};

document
    .querySelector<HTMLButtonElement>('#start')
    ?.addEventListener('click', () => {
        document.querySelector<HTMLButtonElement>('#start')!.disabled = true; // disable the start button

        const settings: Settings = {
            color: playerColor(),
            id: uuidv4()
        };

        invoke('main_handler', { path: execCommandPath });
        gameMain(app.game, settings);
    });

export type { App, Settings };
export { renderer };
export default app;
