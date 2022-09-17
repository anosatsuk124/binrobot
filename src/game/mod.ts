import { ws } from '../websocket';
import { v4 as uuidv4 } from 'uuid';
import * as PIXI from 'pixi.js';
import { playerColor } from '../menu/mod';
import { Player, Container } from './types';
import { updateContainer, initPlayerContainer } from './container';
import {
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    setVelocity
} from './command/mod';

const inRoomContainers: Array<Container> = new Array();

const myId = uuidv4();
const player: Player = {
    id: myId,
    color: playerColor!,
    direction: null,
    velocity: 0,
    x: 0,
    y: 0
};

const init = (game: PIXI.Application) => {
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

    update(game);
};

const update = (game: PIXI.Application) => {
    window.requestAnimationFrame(() => update(game));
};

const gameMain = (game: PIXI.Application) => {
    window.requestAnimationFrame(() => init(game));
};

export default gameMain;
