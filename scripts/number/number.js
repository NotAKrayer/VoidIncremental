let player = {
    number: {
        version: 1,
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
        numSys: new Decimal("5e2"),
        axioms: [0, 0, 0, 0, 0, 0]
    },
    settings: {
        notation: "Mixed"
    }
}

let otherData = {
    axiomsCost: [new Decimal("1e2")]
}


let tierUpData = [ //cost - bro. need  - needed tier level for stuff. sign - bro...//
    {
        cost: new Decimal(0),
        need: 0,
        sign: "ℕ"
    },
    {
        cost: new Decimal(15),
        need: 1,
        sign: "ℤ"
    },
    {
        cost: new Decimal(50),
        need: 2,
        sign: "ℚ"
    },
    {
        cost: new Decimal(150),
        need: 3,
        sign: "ℝ"
    },
    {
        cost: new Decimal(300),
        need: 4,
        sign: "ℂ"
    }
]


createObject(900, 500,
    `
    <div style="width: 550px; height: 500px; background-color: #000000; border: 1px solid white";>
    <p style="font-size: 24px; text-align: center; margin: auto; word-break: break-word;" class="purplegrad">∞ Number ∞<br> Current Tier: <span id="tier"">None</span> </p>
    <button class="info1" onclick="openInfo()">i</button>
    <button id="tierUp" onclick="tierUp()">Tier Up <br> Reset your <span class="purplegrad">Number</span>, but give boost to your <span class="purplegrad">Number</span> gain <br> Cost: <span id="costTier">0</span></button>
    </div>
    `
);
createObject(350, 350,
    `
    <div style="width: 500px; height: 200px; background-color: #000000; border: 1px solid white"; id="info1">
    <p style="font-size: 25px; text-align: center; margin: auto; color: wheat;">NUMBER</p>
    <p style="font-size: 18px; text-align: left; margin-left: 10px; color: white;">Current Boost by tier: <span id="tierBoost">0</span>x</p>
    </div>
    `
);

createObject(900, 210,
    `
    <div style="width: 550px; height: 50px; background-color: #000000; border: 1px solid white";>
    <p style="font-size: 25px; text-align: center; margin-top: 10px;" class="purplegrad";"><span id="number">0</span></p>
    </div>
    `
); //PLEASE ADD R^3 STUFF yes my past myself i add it twin

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
    let currentTier = player.number.tier;
    let currentTierNext = (currentTier).add("1e0");
    if (new Decimal(player.number.tier).gte("5")) {
        if (new Decimal(player.number.tier).gte(new Decimal("5e0"))) {
            if (new Decimal(player.number.value).gte(player.number.numSys)) {
                player.number.numSys = new Decimal(player.number.numSys).mul(1.5);
                formatNumber("costTier", player.number.numSys)
                player.number.tier = new Decimal(player.number.tier).add("1e0") //add tier
                //
                 let tierName = capitalizeFirst(cleanOutput(
                    numberToLatin(player.number.tier.toString(), { la_macra: false, la_useard: false, ___showsep: false }, latinTables.latinmacron)
                    .replaceAll("<wbr/>", "")
                ))
                const maxLength = 45;
                let displayedTierName = tierName.length > maxLength ? tierName.slice(0, maxLength - 3) + "..." : tierName;
                el("tier").innerHTML = displayedTierName + "nions" + `(ℝ^${(player.number.tier).toPrecision(3)})`;;
                ///
                player.number.tierBoost = new Decimal(player.number.tierBoost).add("1e0") //adding boost
                formatNumber("tierBoost", player.number.tierBoost)
                player.number.value = new Decimal("0e0")
                formatNumber("number", player.number.value)
            }
        }
    } else {
        if (new Decimal(player.number.tier).gte(tierUpData[currentTier].need)) { //check level
            if (new Decimal(player.number.value).gte(tierUpData[currentTier].cost)) { //then check cost
                if (currentTierNext != 5) {
                    el("costTier").innerHTML = tierUpData[currentTierNext].cost.toPrecision(3)
                } else {
                    formatNumber("costTier", player.number.numSys)
                }
                player.number.tier = new Decimal(player.number.tier).add("1e0") //add tier
                el("tier").innerHTML = tierUpData[currentTier].sign //visual
                player.number.tierBoost = new Decimal(player.number.tierBoost).add("1e0") //adding boost
                formatNumber("tierBoost", player.number.tierBoost) //visual
                player.number.value = new Decimal("0e0")
                formatNumber("number", player.number.value) //visual
            }
        }
    }
}

function gainNumber(delta_time, total_time) {
    let e = new Decimal(1)
    if (player.number.axioms[0] === 1) {
        e = e.plus(1);
    }
    e = e.mul(player.number.tierBoost)
        .mul(delta_time / 1000)
    player.number.value = new Decimal(player.number.value).plus(e)
    formatNumber("number", player.number.value)
}

function updateUpgradesVisibility() {
    let currentTier = player.number.tier;
    let currentTierNext = (currentTier).add("1e0");

    if (new Decimal(player.number.tier).gte("5")) {
        if (new Decimal(player.number.value).gte(player.number.numSys)) {
            el("tierUp").style.border = "3px solid #9154cbc5"
        } else {
            el("tierUp").style.border = "2px solid #3d1265"
        }
    } else {
        if (new Decimal(player.number.value).gte(tierUpData[currentTier].cost)) {
            el("tierUp").style.border = "3px solid #9154cbc5"
        } else {
            el("tierUp").style.border = "2px solid #3d1265"
        }
    }
}