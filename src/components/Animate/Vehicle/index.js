import * as THREE from "three";
import { metaData as rows } from "../../Map";
import { maxTileIndex, minTileIndex, tileSize } from "../../../constant";

const clock = new THREE.Clock();

export function animateVehicles(){
    const delta = clock.getDelta();

    rows.forEach((rowData) => {
        if(rowData.type === "cars" || rowData.type === "trucks"){
            const beginOfRow = (minTileIndex - 2) * tileSize;
            const endOfRow = (maxTileIndex + 2) * tileSize;

            rowData.vehicles.forEach(({ref}) => {
                if(!ref) throw Error("Vehicle references is missing!");

                if(rowData.direction){
                    ref.position.x = ref.position.x > endOfRow ? beginOfRow : ref.position.x + rowData.speed * delta;
                }
                else{
                    ref.position.x = ref.position.x < beginOfRow ? endOfRow : ref.position.x - rowData.speed * delta;
                }
            })
        }
    })
}