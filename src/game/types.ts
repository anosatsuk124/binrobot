import * as PIXI from 'pixi.js';

const Direction = {
    Left: 'left',
    Right: 'right',
    Up: 'up',
    Down: 'down'
} as const;

type Direction = typeof Direction[keyof typeof Direction];

type Player = {
    id: string;
    color: string;
    direction: Direction | null;
    velocity: number;
    x: number;
    y: number;
};

type Container = {
    id: string;
    container: PIXI.Container<PIXI.DisplayObject>;
};

export type { Direction, Player, Container };
