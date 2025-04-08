import * as THREE from "three";
import { maxTileIndex, minTileIndex } from "../constant";

export function generateRows(amount) {
    const rows = []
    
    for(let iRow = 0; iRow < amount; iRow++){
        const row = generateRow();
        rows.push(row)
    }

    return rows;
}

function generateRow(){
    const type = randomElement(["forest","cars","trucks"]);
    switch(type){
        case "forest":
            return generateForestRow();
        case "cars":
            return generateCarsRow();
        case "trucks":
            return generateTrucksRow();
        default:
            break;
    }
}

function randomElement(array){
    return array[Math.floor(Math.random() * array.length)]
}

function generateForestRow(){
    const occupiedTile = new Set();
    const trees = Array.from({ length: 4 }, () => {
        let tileIndex;
        do{
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while(occupiedTile.has(tileIndex));
        occupiedTile.add(tileIndex);

        const height = randomElement([20,45,60]);
        return { tileIndex, height }
    })
    
    return { type: "forest", trees }
}

function generateCarsRow(){
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 160, 180]);
    const occupiedTile = new Set();

    const vehicles = Array.from({length: 3}, () => {
        let tileIndex;
        do{
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        }while(occupiedTile.has(tileIndex));
        occupiedTile.add(tileIndex - 1);
        occupiedTile.add(tileIndex);
        occupiedTile.add(tileIndex + 1);

        const color = randomElement([0xa52523, 0xbdb638, 0x78b14b]);

        return {
            initialTileIndex: tileIndex,
            color
        }
    });
    
    return {
        type: "cars",
        direction,
        speed,
        vehicles
    };
}

function generateTrucksRow(){
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 160, 180]);
    const occupiedTile = new Set();

    const vehicles = Array.from({length: 3}, () => {
        let tileIndex;
        do{
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while(occupiedTile.has(tileIndex));
        occupiedTile.add(tileIndex - 2);
        occupiedTile.add(tileIndex - 1);
        occupiedTile.add(tileIndex);
        occupiedTile.add(tileIndex + 1);
        occupiedTile.add(tileIndex + 2);

        const color = randomElement([0xa52523, 0xbdb638, 0x78b14b]);

        return {
            initialTileIndex: tileIndex,
            color
        }
    });

    return {
        type: "trucks",
        direction,
        speed,
        vehicles
    };
}