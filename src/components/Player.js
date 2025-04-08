import * as THREE from "three";
import { endupValidPosition } from "../functions/endupValidPosition";
import { metaData as rows, addRow } from "./Map";

export const postition = {
    currentRow: 0,
    currentTiles: 0
}

export const moveQueues = [];

export function queueMove(direction){
    const isValidMove = endupValidPosition({
        rowIndex: postition.currentRow,
        tileIndex: postition.currentTiles
    }, [...moveQueues, direction]);
    if(!isValidMove) return;

    moveQueues.push(direction);
}

export function stepComplete() {
    const direction = moveQueues.shift();
    switch(direction){
        case "left":
            postition.currentTiles -= 1;
            break;
        case "right":
            postition.currentTiles += 1;
            break;
        case "forward":
            postition.currentRow += 1;
            break;
        case "backward":
            postition.currentRow -= 1;
            break;
        default:
            break;
    }

    if(postition.currentRow > rows.length - 10) addRow();
    const scoreDOM = document.getElementById("score");
    if(scoreDOM) {
        const _oldVal = parseInt(scoreDOM.innerText.toString());
        const _newVal = parseInt(postition.currentRow.toString());

        if(_newVal > _oldVal){
            scoreDOM.innerText = _newVal.toString();
        }
    }
}

export function initializePlayer(){
    moveQueues.length = 0;
    postition.currentRow = 0;
    postition.currentTiles = 0;

    player.position.x = 0;
    player.position.y = 0;
    player.children[0].position.z = 0;
}

export const player = Player();

function Player(){
    const player = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(15,15,20),
        new THREE.MeshLambertMaterial({
            color: "white",
            flatShading: true,
        })
    )

    body.position.z = 10;
    body.castShadow = true;
    body.receiveShadow = true;
    player.add(body);

    const cap = new THREE.Mesh(
        new THREE.BoxGeometry(2,4,2),
        new THREE.MeshLambertMaterial({
            color: 0xf0619a,
            flatShading: true
        })
    )
    cap.position.z = 21;
    cap.castShadow = true;
    cap.receiveShadow = true;
    player.add(cap);

    const playerContainer = new THREE.Group();
    playerContainer.add(player);

    return playerContainer;
}