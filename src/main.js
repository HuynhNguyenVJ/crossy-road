import * as THREE from "three";
import "./style.css";

import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { initializePlayer, player } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { DirectionalLight } from "./components/DirectionalLight";
import { animateVehicles } from "./components/Animate/Vehicle";
import "./functions/playerMove";
import { animatePlayer } from "./components/Animate/Player";
import { hitTest } from "./functions/hitTest";

const resultDOM = document.getElementById("result-container");
const scoreDOM = document.getElementById("score");
const finalScoreDOM = document.getElementById("final-score");

export let isGameOver = false;

export function updateGameStatus(status) {
    isGameOver = status;
}

document.getElementById("retry").addEventListener("click", () => {
    initializeGame();
    updateGameStatus(false);
})

const scene = new THREE.Scene();
scene.add(player)
scene.add(map)

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera)

initializeGame();

function initializeGame(){
    initializeMap();
    initializePlayer();

    resultDOM.style.visibility = "hidden";
    scoreDOM.innerText = "0";
    finalScoreDOM.innerText = "0";
}

const renderer = Renderer();
////Fix Texture Color washed-out or darkened colors
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.useLegacyLights = false
renderer.setAnimationLoop(animate);

function animate(){
    animateVehicles();
    animatePlayer();
    hitTest();
    renderer.render(scene, camera)
}

function setLayout(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", setLayout);