const playerColor = document
    .querySelector<HTMLDivElement>('#settings')
    ?.querySelector<HTMLSelectElement>('#player-select')?.value;

export { playerColor };
