import * as THREE from "three";
import { tileSize } from "../../constant";
import { Wheel } from "../Wheel";

function getCarFrontContext(){
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#fff";
    context.fillRect(0,0,64,32);

    context.fillStyle = "#666";
    context.fillRect(15,5,55,24);

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

function getCarBackContext(){
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#fff";
    context.fillRect(0,0,64,32);

    context.fillStyle = "#666";
    context.fillRect(0,5,45,24);

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
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

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
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
    const carBack = getCarBackContext();

    const carRight = getCarSideContext();
    carRight.flipY = direction;

    const carLeft = getCarSideContext();

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(33,24,12),
        [
            new THREE.MeshLambertMaterial({ map: carFront, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carBack, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carRight, flatShading: true }),
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