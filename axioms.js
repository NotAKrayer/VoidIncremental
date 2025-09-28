createObject(1475, 500,
    `
    <div style="width: 550px; height: 500px; background-color: #000000; border: 1px solid white";>
    <p style="font-size: 24px; text-align: center; margin: auto; word-break: break-word;" class="purplegrad">Axioms</p>
    </div>
    `
);

createObject(1350, 400,
    `
    <button id="axiom1StatusB" onclick="buyAxiom(0)"; style="width: 200px; height: 130px; background-color: #000000; border: 1px solid white; border: 2px solid #3d1265;" ><strong>Axiom of Empty Set</strong> <br> <i>+1 to the <span class="purplegrad">Number</span> Base Gain<br></i> <span id="axiom1Status">Cost: 100</span></button>
    `
);

createObject(1600, 400,
    `
    <button id="axiom2StatusB" onclick="buyAxiom(1)"; style="width: 200px; height: 130px; background-color: #000000; border: 1px solid white; border: 2px solid #3d1265;" ><strong>Axiom of Power Set</strong> <br> Boost <span class="purplegrad">Number</span> Gain Based on Tier Boosts<br></i> <span id="axiom2Status">Cost: 1000</span></button>
    `
);

function buyAxiom(id) {
    if (player.number.axioms[id] == 0) {
        if ((player.number.value).gte(otherData.axiomsCost[id])) {
            player.number.value = (player.number.value).minus(otherData.axiomsCost[id])
            player.number.axioms[id] = 1;
            document.getElementById(`axiom${id+1}Status`).textContent = "Purchased"
        } else{
            return
        }
    } else {
        return
    }
}

function updateAxiomsVisibility() {
    for (let i = 0; i < 6; i++) {
        const statusElement = document.getElementById(`axiom${i + 1}StatusB`);
        if (statusElement) {
            if ((player.number.value).gte(otherData.axiomsCost[i]) && (player.number.axioms[i] == 0)) {
                statusElement.style.border = "3px solid #9154cbc5";
            }  else {
                statusElement.style.border = "2px solid #3d1265"
            }
        }
    }
}

//todo list for axioms:
//new Decimal(1).plus((player.number.tierBoost.sqrt(2)).divide(10))  <-- Axiom of Power Set
//Boost Number Gain Based on Formula: 1 + (√(Tier Boost)/10)