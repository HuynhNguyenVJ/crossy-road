import * as THREE from "three";
import { metaData as rows } from "../components/Map";
import { player, postition } from "../components/Player";
import { updateGameStatus } from "../main";

const resultDOM = document.getElementById("result-container");
const scoreDOM = document.getElementById("score");
const finalScoreDOM = document.getElementById("final-score");

export function hitTest(){
    const row = rows[postition.currentRow - 1];
    if(!row) return;

    if(row.type === "cars" || row.type === "trucks"){
        const playerBoundingBox = new THREE.Box3();
        playerBoundingBox.setFromObject(player);

        row.vehicles.forEach(({ref}) => {
            if(!ref) throw new Error("Vehicle reference is missing!");

            const vehicleBoundingBox = new THREE.Box3();
            vehicleBoundingBox.setFromObject(ref);

            if(playerBoundingBox.intersectsBox(vehicleBoundingBox)){
                if(!resultDOM || !finalScoreDOM || !scoreDOM) return;
                resultDOM.style.visibility = "visible";
                finalScoreDOM.innerText = scoreDOM.innerText.toString();
                updateGameStatus(true);
            }
        });
    }
}