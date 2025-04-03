import * as THREE from "three";

export function Camera() {
    const SIZE = 300;
    const VIEW_RATIO = window.innerWidth / window.innerHeight;
    const WIDTH = VIEW_RATIO < 1 ? SIZE : SIZE * VIEW_RATIO;
    const HEIGHT = VIEW_RATIO < 1 ? SIZE / VIEW_RATIO : SIZE;

    const camera = new THREE.OrthographicCamera(
        WIDTH / -2, //left
        WIDTH / 2, ///right
        HEIGHT / 2, ////Top
        HEIGHT / - 2, ////Bottom
        100, ///Near,
        900 ///Far
    )

    camera.up.set(0,0,1);
    camera.position.set(300, - 300, 300);
    camera.lookAt(0,0,0);

    return camera;
}