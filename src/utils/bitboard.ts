// Helpers for bitboard parsing

//Extracts all square indices from a BigInt bitboard
export function getSquaresFromBitboard(bitBoard: bigint): number[] {
    const squares: number[] = []; // Stores the indices of all squares
    let b = bitBoard;
    // Use 0n instead of 0 (0n : BigInt, 0 : number)
    // != is loose inequality (5 != '5' -> False), !== is strict inequality (5 !== '5' -> True)
    while (b !== 0n) {
        const lastSetBit = b & -b;
        const index = BigInt.asUintN(64, lastSetBit).toString(2).length - 1; // Index of the last set bit
        squares.push(index);
        b &= b - 1n;
    }
    return squares;
}

//Converting square indices to screen coordinates
// row 0 = rank8, col 0 = fileA
export function indexToScreenCoordinates(index: number, isWhite: boolean) {
    const rank = Math.floor(index / 8);
    const file = index % 8;
    return {
        col: isWhite ? file: 7 - file,
        row: isWhite ? 7 - rank : rank
    };
}