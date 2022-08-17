import * as PIXI from 'pixi.js';
import { ws } from './websocket';
import { v4 as uuidv4 } from 'uuid';

const app = new PIXI.Application({
    width: 380,
    height: 300,
    backgroundColor: 0xaaaaaa,
    resolution: window.devicePixelRatio || 1
});

interface Player {
    id: string;
    color: string | undefined;
    player_direction: number;
    player_velocity: number;
}

interface Container {
    id: string;
    container: PIXI.Container<PIXI.DisplayObject>;
}

const inRoomPlayers = new Array();
const inRoomContainer: Array<Container> = new Array();
const inRoomIds: Array<string> = new Array();

const controllPlayer = (player: Player) => {
    if (!inRoomIds.includes(player.id)) {
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
        app.stage.addChild(container);
        inRoomIds.push(player.id);
        console.log(`init player: ${player.id}`);
        inRoomContainer.push({
            id: player.id,
            container: container
        });
        console.log(`init container: ${container.width}`);
    }

    inRoomContainer.forEach((container) => {
        if (container.id == player.id) {
            console.log(`Player: ${player.id}`);
            console.log(`Container: ${container.id}`);
            if (container != null) {
                const currentPlayer = container.container;
                app.ticker.addOnce((delta: number) => {
                    if (
                        currentPlayer.x + currentPlayer.width <
                        app.screen.width
                    ) {
                        currentPlayer.x += 1 * delta;
                    } else {
                        currentPlayer.x = 0;
                    }
                });
            }
        }
    });
};

const myId = uuidv4();

ws.onmessage = async (e) => {
    const text = await e.data.text();
    const player: Player = JSON.parse(text);
    controllPlayer(player);
};

document
    .querySelector<HTMLButtonElement>('#start')
    ?.addEventListener('click', () => {
        document.querySelector<HTMLButtonElement>('#start')!.disabled = true; // disable the start button

        const playerColor = document
            .querySelector<HTMLDivElement>('#settings')
            ?.querySelector<HTMLSelectElement>('#player-select')?.value;

        const player: Player = {
            id: myId,
            color: playerColor,
            player_direction: 0,
            player_velocity: 0
        };

        controllPlayer(player);
        inRoomIds.push(myId);
        setInterval(() => {
            ws.send(JSON.stringify(player));
        }, 10);
    });

export { app };
