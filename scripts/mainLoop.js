let last_time = null;
let total_time = 0;
let tempUpdateTimer = 0;
const TEMP_UPDATE_INTERVAL = 100;

setInterval(function gameLoop() {
    const current_time = Date.now();
    if (last_time === null) {
        last_time = current_time;
    }
    const delta_time = current_time - last_time;
    total_time += delta_time;
    last_time = current_time;

    tempUpdateTimer += delta_time;
    if (tempUpdateTimer >= TEMP_UPDATE_INTERVAL) {
        updateTemp();
        updateUpgradesVisibility();
        updateAxiomsVisibility();
        tempUpdateTimer = 0;
    }
    gainNumber(delta_time);
}, 1000 / 60);