import * as THREE from "three";
import { tileSize } from "../../constant";
import { Wheel } from "../Wheel";

export function Truck(initialIndex, direction, color){
    const truck = new THREE.Group();
    truck.position.x = initialIndex * tileSize;

    if(!direction) truck.rotation.z = Math.PI;

    const cargo = new THREE.Mesh(
        new THREE.BoxGeometry(70, 35, 35),
        new THREE.MeshLambertMaterial({
            color: 0xb4c6fc,
            flatShading: true,
        })
    )
    cargo.position.x = -15;
    cargo.position.z = 25;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(30,30,30),
        new THREE.MeshLambertMaterial({
            color,
            flatShading: true,
        })
    )
    cabin.position.x = 35;
    cabin.position.z = 20;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);

    const frontWheel = Wheel(37);
    truck.add(frontWheel);

    const midWheel = Wheel(5);
    truck.add(midWheel);

    const backWhell = Wheel(-35);
    truck.add(backWhell);

    return truck;
}