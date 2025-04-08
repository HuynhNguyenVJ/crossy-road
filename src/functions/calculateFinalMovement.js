export function calculateFinalMovement(currentPosition, moves){
    return moves.reduce((position, direction) => {
        switch(direction){
            case "forward":
                return {
                    rowIndex: position.rowIndex + 1,
                    tileIndex: position.tileIndex
                }
            case "backward":
                return {
                    rowIndex: position.rowIndex - 1,
                    tileIndex: position.tileIndex
                }
            case "left":
                return {
                    rowIndex: position.rowIndex,
                    tileIndex: position.tileIndex - 1
                }
            case "right":
                return {
                    rowIndex: position.rowIndex,
                    tileIndex: position.tileIndex + 1
                }
            default:
                break;
        }
    }, currentPosition);
}