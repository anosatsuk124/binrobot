import { Event, listen } from '@tauri-apps/api/event';
import { Direction, Player } from './types';
import {
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    setVelocity
} from './command/mod';
import { ws } from '../websocket';

const APIListener = async (player: Player): Promise<() => void> => {
    const unlistenMove = await move(player);
    return () => {
        unlistenMove();
    };
};

type CommandAPI = {
    Move?: {
        direction: Direction;
        velocity: number;
    };
};

const move = async (player: Player) => {
    return await listen('command-api-move', (event: Event<CommandAPI>) => {
        const api = event.payload.Move;
        console.log(`api :${JSON.stringify(api)}`);
        switch (api?.direction) {
            case 'left':
                ws.send(
                    JSON.stringify(setVelocity(moveLeft(player), api.velocity))
                );
                break;
            case 'right':
                ws.send(
                    JSON.stringify(setVelocity(moveRight(player), api.velocity))
                );
                break;
            case 'up':
                ws.send(
                    JSON.stringify(setVelocity(moveUp(player), api.velocity))
                );
                break;
            case 'down':
                ws.send(
                    JSON.stringify(setVelocity(moveDown(player), api.velocity))
                );
                break;
        }
    });
};

export default APIListener;
