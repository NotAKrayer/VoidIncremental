let last_time = null;
let total_time = 0;
setInterval(function gameLoop() {
    updateUpgradesVisibility()
    updateAxiomsVisibility()
    const current_time = Date.now();
    if (last_time === null) {
        last_time = current_time;
    }
    const delta_time = current_time - last_time;
    total_time += delta_time;
    last_time = current_time;
    gainNumber(delta_time, total_time); 
}, 1000 / 60);

