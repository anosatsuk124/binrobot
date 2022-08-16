import * as PIXI from 'pixi.js';

const player = new PIXI.Container();
// Create a new texture

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

// Create a 5x5 grid of bunnies
const tank = new PIXI.Sprite(texture);
tank.anchor.set(0.5);
tank.x = 40;
tank.y = 40;
player.addChild(tank);

player.scale.x = player.scale.y = 0.5;

export {player};
