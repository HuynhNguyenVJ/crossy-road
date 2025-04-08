import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";
import { Road } from "./Road";
import { Car } from "./Car";
import { Truck } from "./Truck";
import { generateRows } from "../functions/generateRows";

export const metaData = [] 

export const map = new THREE.Group();

export function initializeMap() {
    metaData.length = 0;
    map.remove(...map.children);

    for(let iRow = 0; iRow > -5; iRow--){
        const grass = Grass(iRow);
        map.add(grass)
    }
    addRow();
}

export function addRow(){
    const newMetaData = generateRows(20);
    const startIndex = metaData.length;
    metaData.push(...newMetaData);

    newMetaData.forEach((rowData, index) => {
        const rowIndex = startIndex + index + 1;
        switch(rowData.type){
            case "forest":
                initForest(rowIndex, rowData);
                break;
            case "cars":
                initRoadCar(rowIndex, rowData);
                break;
            case "trucks":
                initRoadTruck(rowIndex, rowData);
                break;
            default:
                break;
        }
    })
}

function initForest(rowIndex, rowData){
    const row = Grass(rowIndex);
    rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = Tree(tileIndex, height);
        row.add(tree)
    })
    map.add(row)
}

function initRoadCar(rowIndex, rowData){
    const row = Road(rowIndex);
    rowData.vehicles.forEach((vehicle) => {
        const car = Car(vehicle.initialTileIndex, rowData.direction, vehicle.color);
        vehicle.ref = car;
        row.add(car);
    })
    map.add(row)
}

function initRoadTruck(rowIndex, rowData){
    const row = Road(rowIndex);
    rowData.vehicles.forEach((vehicle) => {
        const car = Truck(vehicle.initialTileIndex, rowData.direction, vehicle.color);
        vehicle.ref = car;
        row.add(car);
    })
    map.add(row)
}