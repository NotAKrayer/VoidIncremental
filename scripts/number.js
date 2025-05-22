let player = {
    number: {
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
    }
}


let tierUpData = [ //cost - bro. need  - needed tier level for stuff. sign - bro...
    {
        cost: 0,
        need: 0,
        sign: "ℕ"
    },
    {
        cost: 15,
        need: 1,
        sign: "ℤ"
    },
    {
        cost: 50,
        need: 2,
        sign: "ℚ"
    },
    {
        cost: 150,
        need: 3,
        sign: "ℝ"
    },
    {
        cost: 300,
        need: 4,
        sign: "ℂ"
    },
    {
        cost: 500,
        need: 5
    }
]


createObject(900, 500,
    `
    <div style="width: 550px; height: 500px; background-color: #000000; border: 1px solid white";>
    <p style="font-size: 25px; text-align: center; margin: auto;" class="purplegrad">∞ Number ∞<br> Current Tier: <span id="tier"">None</span> <br> <br>  <span id="number">0</span> </p>
    <button class="info1" onclick="openInfo()">i</button>
    <button id="tierUp" onclick="tierUp()">Tier Up <br> Reset your <span class="purplegrad">Number</span>, but give boost to your <span class="purplegrad">Number</span> gain <br> Cost: <span id="costTier">0</span></button>
    </div>
    `
);
createObject(355, 350,
    `
    <div style="width: 500px; height: 200px; background-color: #000000; border: 1px solid white"; id="info1">
    <p style="font-size: 25px; text-align: center; margin: auto; color: wheat;">NUMBER</p>
    <p style="font-size: 18px; text-align: left; margin-left: 10px; color: white;">Current Boost by tier: <span id="tierBoost">0</span>x</p>
    </div>
    `
); //PLEASE ADD R^3 STUFF

//ℕℤ // 665 50 - coords
const homeButton = createObject(70, 50, `
  <button style="width: 100px; height: 40px; background-color: #000000; border: 2px solid #3d1265;" onclick="teleportToHome()">Home</button>
`);
homeButton.dataset.screen = 'true';

function teleportToHome() {
    if (isMobileDevice()) {
        camera.x = 665
        camera.y = 65
        updateCamera()
    } else {
        camera.x = 0
        camera.y = 0
        updateCamera()
    }
}

function openInfo() {
    let obj = el("info1")
    if (obj.style.visibility == "visible") {
        obj.style.visibility = "hidden";
    } else {
        obj.style.visibility = "visible"
    }
}

function tierUp() {
    let currentTier = player.number.tier.toNumber();
    let currentTierNext = currentTier + 1;
    if (new Decimal(player.number.tier).gte("5")) {
        if (new Decimal(player.number.tier).gte(tierUpData[5].need)) {
            if (new Decimal(player.number.value).gte(tierUpData[5].cost)) {
                tierUpData[5].cost = new Decimal(tierUpData[5].cost).mul(1.5);
                el("costTier").innerHTML = tierUpData[5].cost.toPrecision(3)
                player.number.tier = new Decimal(player.number.tier).add("1e0") //add tier
                el("tier").innerHTML = capitalizeFirst(cleanOutput(
                    numberToLatin(player.number.tier.toString(), { la_macra: false, la_useard: false, ___showsep: false }, latinTables.latinmacron)
                    .replaceAll("<wbr/>", "")
                    )
                ) + "nions"
                player.number.tierBoost = new Decimal(player.number.tierBoost).add("1e0") //adding boost
                el("tierBoost").innerHTML = player.number.tierBoost.toPrecision(3) //visual
                player.number.value = new Decimal("0e0")
                el("number").innerHTML = player.number.value //visual
            }
        }
    } else {
        if (new Decimal(player.number.tier).gte(tierUpData[currentTier].need)) { //check level
            if (new Decimal(player.number.value).gte(tierUpData[currentTier].cost)) { //then check cost
                el("costTier").innerHTML = tierUpData[currentTierNext].cost.toPrecision(3)
                player.number.tier = new Decimal(player.number.tier).add("1e0") //add tier
                el("tier").innerHTML = tierUpData[currentTier].sign //visual
                player.number.tierBoost = new Decimal(player.number.tierBoost).add("1e0") //adding boost
                el("tierBoost").innerHTML = player.number.tierBoost.toPrecision(3) //visual
                player.number.value = new Decimal("0e0")
                el("number").innerHTML = player.number.value //visual
            }
        }
    }
}

function gainNumber(delta_time, total_time) {
    const e = new Decimal(1)
        .mul(player.number.tierBoost).mul(1e34)
        .mul(delta_time / 1000)
    player.number.value = new Decimal(player.number.value).plus(e)
    el("number").innerHTML = player.number.value.toPrecision(3);
}

let last_time = null;
let total_time = 0;
setInterval(function gameLoop() {
    const current_time = Date.now();
    if (last_time === null) {
        last_time = current_time;
    }
    const delta_time = current_time - last_time;
    total_time += delta_time;
    last_time = current_time;
    gainNumber(delta_time, total_time);
}, 1000 / 60);