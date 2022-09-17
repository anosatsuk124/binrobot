const menu = document.querySelector<HTMLDivElement>('#menu');

const playerColor = menu
    ?.querySelector<HTMLDivElement>('#settings')
    ?.querySelector<HTMLSelectElement>('#player-select')?.value;

export { playerColor };
