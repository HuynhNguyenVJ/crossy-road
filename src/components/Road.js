import * as THREE from "three";
import { maxTileIndex, tileSize, tilesPerRow } from "../constant";

export function Road(rowIndex){
    const road = new THREE.Group();
    road.position.y = rowIndex * tileSize

    const foundation = new THREE.Mesh(
        new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize),
        new THREE.MeshLambertMaterial({
            color: 0x454a59
        })
    )
    foundation.receiveShadow = true;
    road.add(foundation);

    const count = maxTileIndex / 2;

    for(let iRow = - count; iRow <= count; iRow++){
        const roadLine = new THREE.Mesh(
            new THREE.BoxGeometry(tileSize, 5),
            new THREE.MeshLambertMaterial({
                color: 0xeeeeee
            })
        )
        roadLine.position.x = tileSize * iRow * 2;
        roadLine.position.y = 0;
        roadLine.position.z = 1;
        roadLine.receiveShadow = true;

        road.add(roadLine);
    }

    return road;
}