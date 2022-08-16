import * as PIXI from 'pixi.js';
import {player} from './player/mod';

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0xAAAAAA, resolution: window.devicePixelRatio || 1,
});

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    if (player.x + player.width < app.screen.width) {
        player.x += 1 * delta;
    }
});

app.stage.addChild(player);

export {app};
