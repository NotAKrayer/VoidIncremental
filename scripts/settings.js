createObject(900, 895,
    `
    <div style="width: 550px; height: 250px; background-color: black; border: 1px solid white">
    <p style="font-size: 30px; text-align: left; margin: auto; margin-left: 5px;" class="purplegrad">🛠 Settings <br></p>
    <button onclick="notationChange(this)" id="notation">Notation: Mixed</button>
    </div>
    `
);

function notationChange(button) {
    if (button.textContent === "Notation: Mixed") {
        button.textContent = "Notation: Scientific";
        set = "exp"
        player.settings.notation = "Scientific";
    } else {
        button.textContent = "Notation: Mixed";
        set = "suff"
        player.settings.notation = "Mixed";
    }
}