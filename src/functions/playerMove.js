import { queueMove } from "../components/Player";
import { isGameOver } from "../main";

window.addEventListener("keydown", (event) => {
    if(isGameOver) {
        event.preventDefault();
        return;
    }

    switch(event.key){
        case "ArrowUp":
            event.preventDefault();
            queueMove("forward");
            break;
        case "ArrowDown":
            event.preventDefault();
            queueMove("backward");
            break;
        case "ArrowLeft":
            event.preventDefault();
            queueMove("left");
            break;
        case "ArrowRight":
            event.preventDefault();
            queueMove("right");
            break;
        default:
            break;
    }
})