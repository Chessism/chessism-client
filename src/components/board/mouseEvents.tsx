// Mouse event handlers

export const handleLeftClick = (row: number, col: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Usr left-clicked ${row} ${col}`);
};

export const handleRightClick = (row: number, col: number) => (e: React.MouseEvent)=> {
    e.preventDefault();
    console.log(`Usr right-clicked ${row} ${col}`);
    // TODO: implement highlights and arrows
};