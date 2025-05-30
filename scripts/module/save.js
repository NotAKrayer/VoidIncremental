let preset = {
    number: {
        version: 1,
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
        numSys: new Decimal("5e2")
    }
}

function replaceDecimals(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Decimal) {
        return { __type: 'decimal', value: obj.toString() };
    }

    if (Array.isArray(obj)) {
        return obj.map(replaceDecimals);
    }

    const result = {};
    for (const key in obj) {
        result[key] = replaceDecimals(obj[key]);
    }
    return result;
}

function reviveDecimals(data) {
    if (data === null || typeof data !== 'object') return data;

    if (Array.isArray(data)) {
        return data.map(reviveDecimals);
    }

    if (typeof data === 'object' && data.__type === 'decimal') {
        return new Decimal(data.value);
    }

    const result = {};
    for (const key in data) {
        result[key] = reviveDecimals(data[key]);
    }
    return result;
}

function saveGame() {
    const cleanedData = replaceDecimals(player);
    const stringified = JSON.stringify(cleanedData);
    const compressed = LZString.compressToBase64(stringified);
    localStorage.setItem("voidinc", compressed);
    console.log("Game saved.");
}

function loadGame() {
    const compressed = localStorage.getItem("voidinc");
    if (!compressed) return null;

    try {
        const decompressed = LZString.decompressFromBase64(compressed);
        const parsed = JSON.parse(decompressed);
        const revived = reviveDecimals(parsed);
        //UPDATE VISIBILITY
        if (new Decimal(revived.number.tier).gte("5e0")) {
            el("tier").innerHTML = capitalizeFirst(cleanOutput(
            numberToLatin(revived.number.tier.toString(), { la_macra: false, la_useard: false, ___showsep: false }, latinTables.latinmacron)
            .replaceAll("<wbr/>", "")
            )
            ) + "nions"  + `(ℝ^${(new Decimal(revived.number.tier)).toPrecision(3)})`
            el("costTier").innerHTML = (revived.number.numSys).toPrecision(3)
        } else {
            el("tier").innerHTML = tierUpData[(revived.number.tier).sub("1e0")].sign
            el("costTier").innerHTML = tierUpData[new Decimal(revived.number.tier)].cost.toPrecision(3)
        }

        el("tierBoost").innerHTML = (revived.number.tierBoost).toPrecision(3)
        //
        return revived;
        
    } catch (e) {
        console.error("Failed to load save data:", e);
        return null;
    }
}


window.onload = function() {
    if (loadGame()) {
        player = loadGame()
    } else {
        player = preset
    }
}