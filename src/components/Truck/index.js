import * as THREE from "three";
import { tileSize } from "../../constant";
import { Wheel } from "../Wheel";

function getCarFrontContext(color){
    const canvas = document.createElement("canvas");
    canvas.width = 30;
    canvas.height = 30;
    const context = canvas.getContext("2d");

    context.fillStyle = color;
    context.fillRect(0,0,30,30);

    context.fillStyle = "#666";
    context.fillRect(5,0,10,30);

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

function getCarRightSideContext(color){
    const canvas = document.createElement("canvas");
    canvas.width = 30;
    canvas.height = 30;
    const context = canvas.getContext("2d");

    context.fillStyle = color;
    context.fillRect(0,0,30,30);

    context.fillStyle = "#666";
    context.fillRect(15,5,15,10);

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

function getCarLeftSideContext(color){
    const canvas = document.createElement("canvas");
    canvas.width = 30;
    canvas.height = 30;
    const context = canvas.getContext("2d");

    context.fillStyle = color;
    context.fillRect(0,0,30,30);

    context.fillStyle = "#666";
    context.fillRect(15,15,15,10);

    ////Fix Texture Color washed-out or darkened colors
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

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

    const newColor = "#" + color.toString(16);
    const carFront = getCarFrontContext(newColor);
    const carRight = getCarRightSideContext(newColor);
    const carLeft = getCarLeftSideContext(newColor);
    carLeft.center = new THREE.Vector2(0.5,0.5);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(30,30,30),
        [
            new THREE.MeshLambertMaterial({ map: carFront, flatShading: true }),
            new THREE.MeshLambertMaterial({ color, flatShading: true, }),
            new THREE.MeshLambertMaterial({ map: carLeft, flatShading: true }),
            new THREE.MeshLambertMaterial({ map: carRight, flatShading: true }),
            new THREE.MeshLambertMaterial({ color, flatShading: true, }),
            new THREE.MeshLambertMaterial({ color, flatShading: true, }),
        ]
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