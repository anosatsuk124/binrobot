import { ws } from '../websocket';
import { v4 as uuidv4 } from 'uuid';
import * as PIXI from 'pixi.js';
import { playerColor } from '../menu/mod';

type Player = {
    id: string;
    color: string;
    player_direction: number;
    player_velocity: number;
    x: number;
    y: number;
};

type Container = {
    id: string;
    container: PIXI.Container<PIXI.DisplayObject>;
};

const inRoomContainers: Array<Container> = new Array();
const myId = uuidv4();
const player: Player = {
    id: myId,
    color: playerColor!,
    player_direction: 0,
    player_velocity: 0,
    x: 0,
    y: 0
};

const updateContainer = (game: PIXI.Application, container: Container) => {
    if (container != null) {
        const currentPlayer = container.container;
        game.ticker.addOnce((delta: number) => {
            if (currentPlayer.x + currentPlayer.width < game.screen.width) {
                currentPlayer.x += 1 * delta;
            } else {
                currentPlayer.x = 0;
            }
        });
    }
};

const initPlayer = (game: PIXI.Application, player: Player): Container => {
    const container = new PIXI.Container();
    const color = player.color;

    const texture = (() => {
        if (color == 'red') {
            return PIXI.Texture.from('/tank_red.png');
        } else if (color == 'blue') {
            return PIXI.Texture.from('/tank_blue.png');
        } else if (color == 'dark') {
            return PIXI.Texture.from('/tank_dark.png');
        } else if (color == 'green') {
            return PIXI.Texture.from('/tank_green.png');
        } else if (color == 'sand') {
            return PIXI.Texture.from('/tank_sand.png');
        }

        return PIXI.Texture.from('/tank_red.png');
    })();
    const tank = new PIXI.Sprite(texture);
    tank.anchor.set(0.5);
    tank.x = 40;
    tank.y = 40;
    container.addChild(tank);

    container.scale.x = container.scale.y = 0.15;
    game.stage.addChild(container);

    console.log(`init player: ${player.id}`);
    return {
        id: player.id,
        container: container
    };
};

const init = (game: PIXI.Application) => {
    ws.onmessage = async (e) => {
        const text = await e.data.text();
        const player_object: Player = JSON.parse(text);
        const container = inRoomContainers.find(
            (p) => p.id == player_object.id
        );

        if (container == undefined) {
            const container = initPlayer(game, player_object);
            inRoomContainers.push(container);
        } else {
        }
    };

    const playerContainer = initPlayer(game, player);
    inRoomContainers.push(playerContainer);
    ws.send(JSON.stringify(player));

    update(game);
};

const update = (game: PIXI.Application) => {
    for (const container of inRoomContainers) {
        updateContainer(game, container);
    }
    window.requestAnimationFrame(() => update(game));
};

const gameMain = (game: PIXI.Application) => {
    window.requestAnimationFrame(() => init(game));
};

export default gameMain;
