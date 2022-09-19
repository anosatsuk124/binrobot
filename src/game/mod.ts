import { ws } from '../websocket';
import * as PIXI from 'pixi.js';
import { Player, Container } from './types';
import { updateContainer, initPlayerContainer } from './container';
import APIListener from './api';
import { Settings } from '../app';

const init = (game: PIXI.Application, settings: Settings) => {
    const inRoomContainers: Array<Container> = new Array();

    const player: Player = {
        id: settings.id,
        color: settings.color,
        direction: null,
        velocity: 0,
        x: 0,
        y: 0
    };

    ws.onmessage = async (e) => {
        const text = await e.data.text();
        const player_object: Player = JSON.parse(text);
        let container = inRoomContainers.find((p) => p.id == player_object.id);

        if (container == undefined) {
            container = initPlayerContainer(game, player_object);
            inRoomContainers.push(container);
        }

        updateContainer(
            game,
            player_object.velocity,
            player_object.direction,
            container
        );
    };

    const playerContainer = initPlayerContainer(game, player);
    inRoomContainers.push(playerContainer);
    ws.send(JSON.stringify(player));

    APIListener(player);

    update(game);
};

const update = (game: PIXI.Application) => {
    window.requestAnimationFrame(() => update(game));
};

const gameMain = (game: PIXI.Application, settings: Settings) => {
    window.requestAnimationFrame(() => init(game, settings));
};

export default gameMain;
