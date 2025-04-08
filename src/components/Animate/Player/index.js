import * as THREE from "three";
import { moveQueues, player, postition, stepComplete } from "../../Player";
import { tileSize } from "../../../constant";

const clock = new THREE.Clock();

export function animatePlayer() {
    if(!moveQueues || moveQueues.length < 1) return;
    if(!clock.running) clock.start();

    const stepTime = 0.2;
    const progress = Math.min(1, clock.getElapsedTime() / stepTime);
    setPosition(progress);
    setRotation(progress);

    if(progress >= 1){
        stepComplete();
        clock.stop();   
    }
}

function setPosition(progress){
    const startX = postition.currentTiles * tileSize;
    const startY = postition.currentRow * tileSize;
    let endX = startX;
    let endY = startY;

    switch(moveQueues[0]){
        case "left":
            endX -= tileSize;
            break;
        case "right":
            endX += tileSize;
            break;
        case "forward":
            endY += tileSize;
            break;
        case "backward":
            endY -= tileSize;
            break;
        default:
            break;
    }

    player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
    player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

function setRotation(progress){
    let endRotation = 0;

    switch(moveQueues[0]){
        case "left":
            endRotation = Math.PI / 2;
            break;
        case "right":
            endRotation = - Math.PI / 2;
            break;
        case "forward":
            endRotation = 0
            break;
        case "backward":
            endRotation = Math.PI;
            break;
        default:
            break;
    }

    player.children[0].rotation.z = THREE.MathUtils.lerp(
        player.children[0].rotation.z,
        endRotation,
        progress
    )
}