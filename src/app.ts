import * as PIXI from 'pixi.js';
import gameMain from './game/mod';

type App = {
    game: PIXI.Application;
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

        gameMain(app.game);
    });

export type { App };
export { renderer };
export default app;
