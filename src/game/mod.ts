import { ws } from '../websocket';
import { v4 as uuidv4 } from 'uuid';
import * as PIXI from 'pixi.js';
import { playerColor } from '../menu/mod';

interface Player {
    id: string;
    color: string;
    player_direction: number;
    player_velocity: number;
    x: number;
    y: number;
}

interface Container {
    id: string;
    container: PIXI.Container<PIXI.DisplayObject>;
}

const inRoomContainer: Array<Container> = new Array();
const inRoomIds: Array<string> = new Array();

const controllPlayer = (game: PIXI.Application, player: Player) => {
    for (const container of inRoomContainer) {
        if (container.id == player.id) {
            console.log(`Player: ${player.id}`);
            console.log(`Container: ${container.id}`);
            if (container != null) {
                const currentPlayer = container.container;
                game.ticker.addOnce((delta: number) => {
                    if (
                        currentPlayer.x + currentPlayer.width <
                        game.screen.width
                    ) {
                        currentPlayer.x += 1 * delta;
                    } else {
                        currentPlayer.x = 0;
                    }
                });
            }
        }
    }
};

const initPlayer = (game: PIXI.Application, player: Player) => {
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
    inRoomIds.push(player.id);
    console.log(`init player: ${player.id}`);
    inRoomContainer.push({
        id: player.id,
        container: container
    });
    console.log(`init container: ${container.width}`);
};

const init = (game: PIXI.Application) => {
    ws.onmessage = async (e) => {
        const text = await e.data.text();
        player = JSON.parse(text);
    };

    const myId = uuidv4();
    let player: Player = {
        id: myId,
        color: playerColor!,
        player_direction: 0,
        player_velocity: 0,
        x: 0,
        y: 0
    };

    inRoomIds.push(myId);
    initPlayer(game, player);

    const update = () => {
        ws.send(JSON.stringify(player));
        controllPlayer(game, player);

        window.requestAnimationFrame(() => update());
    };

    update();
};

const gameMain = (game: PIXI.Application) => {
    window.requestAnimationFrame(() => init(game));
};

export default gameMain;
