import { maxTileIndex, minTileIndex } from "../constant";
import { calculateFinalMovement } from "./calculateFinalMovement";
import { metaData as rows } from "../components/Map";

export function endupValidPosition(currentPosition, moves) {
    const finalPosition = calculateFinalMovement(currentPosition, moves);

    if(finalPosition.rowIndex === -1 ||
        finalPosition.tileIndex === minTileIndex - 1 || 
        finalPosition.tileIndex === maxTileIndex + 1
    ){
        return false;
    }

    const finalRow = rows[finalPosition.rowIndex - 1];
    if(finalRow &&
        finalRow.type === "forest" &&
        finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
    ){
        return false;
    }

    return true;
}