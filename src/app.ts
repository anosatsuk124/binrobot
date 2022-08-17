import * as PIXI from 'pixi.js';
import { ws } from './websocket';
import { v4 as uuidv4 } from 'uuid';

const app = new PIXI.Application({
    width: 400,
    height: 300,
    backgroundColor: 0xaaaaaa,
    resolution: window.devicePixelRatio || 1
});

const addPlayer = (color: string | undefined) => {
    const player = new PIXI.Container();

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
    player.addChild(tank);

    player.scale.x = player.scale.y = 0.5;

    // Listen for animate update
    app.ticker.add((delta: number) => {
        // rotate the container!
        // use delta to create frame-independent transform
        if (player.x + player.width < app.screen.width) {
            player.x += 1 * delta;
        } else {
            player.x = 0;
        }
    });

    app.stage.addChild(player);
};

const inRoom = new Array();

ws.onmessage = async (e) => {
    const text = await e.data.text();
    const object = JSON.parse(text);

    const id = object.id;
    const color = object.color;
    const player_x = object.player_x;
    const player_y = object.player_y;

    console.log(`object: ${object}`);

    if (!inRoom.includes(id)) {
        addPlayer(color);
        inRoom.push(id);
    }
};

const myId = uuidv4();

document
    .querySelector<HTMLButtonElement>('#start')
    ?.addEventListener('click', () => {
        document.querySelector<HTMLButtonElement>('#start')!.disabled = true; // disable the start button

        const playerColor = document
            .querySelector<HTMLDivElement>('#settings')
            ?.querySelector<HTMLSelectElement>('#player-select')?.value;

        addPlayer(playerColor);
        inRoom.push(myId);
        ws.send(
            JSON.stringify({
                id: myId,
                color: playerColor,
                player_x: null,
                player_y: null
            })
        );
    });

export { app };
