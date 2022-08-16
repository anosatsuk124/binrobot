import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 400, height: 300, backgroundColor: 0xAAAAAA, resolution: window.devicePixelRatio || 1,
});


document.querySelector<HTMLButtonElement>('#start')?.addEventListener('click', () => {
    const player = new PIXI.Container();

    const player_setting = document.querySelector<HTMLDivElement>('#settings')?.querySelector<HTMLSelectElement>('#player-select')?.value;

    const texture = (() => {
        if (player_setting == 'red') {
            return PIXI.Texture.from('/tank_red.png');
        } else if (player_setting == 'blue') {
            return PIXI.Texture.from('/tank_blue.png');
        } else if (player_setting == 'dark') {
            return PIXI.Texture.from('/tank_dark.png');
        } else if (player_setting == 'green') {
            return PIXI.Texture.from('/tank_green.png');
        } else if (player_setting == 'sand') {
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
    app.ticker.add((delta) => {
        // rotate the container!
        // use delta to create frame-independent transform
        if (player.x + player.width < app.screen.width) {
            player.x += 1 * delta;
        }
    });

    app.stage.addChild(player);
});

export {app};
