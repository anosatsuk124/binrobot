import * as PIXI from 'pixi.js';
import { Direction, Player, Container } from './types';

export const updateContainer = (
    game: PIXI.Application,
    velocity: number,
    direction: Direction | null,
    container: Container
) => {
    if (container != null) {
        const currentPlayer = container.container;
        game.ticker.addOnce((delta: number) => {
            if (
                !(
                    currentPlayer.x + currentPlayer.width < game.screen.width ||
                    currentPlayer.y + currentPlayer.height < game.screen.height
                )
            ) {
                switch (direction) {
                    case 'left':
                        currentPlayer.x += velocity * delta;
                        break;
                    case 'right':
                        currentPlayer.x -= velocity * delta;
                        break;
                    case 'up':
                        currentPlayer.y -= velocity * delta;
                        break;
                    case 'down':
                        currentPlayer.y += velocity * delta;
                        break;
                }
            }
        });
    }
};

export const initPlayerContainer = (
    game: PIXI.Application,
    player: Player
): Container => {
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
