import { Player } from '../types';

const moveLeft = (player: Player): Player => ({
    id: player.id,
    color: player.color,
    velocity: player.velocity,
    direction: 'left',
    x: player.x,
    y: player.y
});

const moveRight = (player: Player): Player => ({
    id: player.id,
    color: player.color,
    velocity: player.velocity,
    direction: 'right',
    x: player.x,
    y: player.y
});

const moveUp = (player: Player): Player => ({
    id: player.id,
    color: player.color,
    velocity: player.velocity,
    direction: 'up',
    x: player.x,
    y: player.y
});

const moveDown = (player: Player): Player => ({
    id: player.id,
    color: player.color,
    velocity: player.velocity,
    direction: 'down',
    x: player.x,
    y: player.y
});

const setVelocity = (player: Player, velocity: number): Player => ({
    id: player.id,
    color: player.color,
    velocity: velocity,
    direction: player.direction,
    x: player.x,
    y: player.y
});

export { moveLeft, moveRight, moveUp, moveDown, setVelocity };
