import * as THREE from "three";
import { tileSize, tilesPerRow } from "../constant";

export function Grass(rowIndex) {
    const grass = new THREE.Group();
    grass.position.y = rowIndex * tileSize;

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
        new THREE.MeshLambertMaterial({
            color: 0xbaf455
        })
    )
    base.position.z = 1.5;
    base.receiveShadow = true;
    grass.add(base);

    return grass;
}