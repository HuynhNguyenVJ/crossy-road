import * as THREE from "three";
import { tileSize } from "../../constant";
import { Wheel } from "../Wheel";

function getCarFrontContext(){
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,64,32);

    context.fillStyle = "#444";
    context.fillRect(8,8,48,24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideContext(){
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#fff";
    context.fillRect(0,0,128,32);

    context.fillStyle = "#666";
    context.fillRect(10,8,38,24);
    context.fillRect(58,8,60,24);

    return new THREE.CanvasTexture(canvas);
}

export function Car(initialTileIndex, direction, color){
    const car = new THREE.Group();
    car.position.x = initialTileIndex * tileSize;

    if(!direction) car.rotation.z = Math.PI;

    const main = new THREE.Mesh(
        new THREE.BoxGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({
            color,
            flatShading: true,
        })
    )
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const carFront = getCarFrontContext();
    // carFront.center = new THREE.Vector2(0.5,0,5);
    // carFront.rotation = Math.PI / 2;

    const carBack = getCarFrontContext();
    const carRight = getCarSideContext();
    const carLeft = getCarSideContext();

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(33,24,12),
        [
            new THREE.MeshLambertMaterial({ map: carFront, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carRight, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carBack, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carLeft, flatShading: true }),
            new THREE.MeshLambertMaterial({
                color: "white",
                flatShading: true
            }),
            new THREE.MeshLambertMaterial({
                color: "white",
                flatShading: true
            })
        ]
    )
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const frontWheel = Wheel(18);
    car.add(frontWheel);

    const backWheel = Wheel(-18);
    car.add(backWheel);

    return car;
}