let preset = {
    number: {
        version: 1,
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
        numSys: new Decimal("5e2"),
    },
    settings: {
        notation: "Mixed"
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

function exportB64() {
    const cleanedData = replaceDecimals(player);
    const stringified = JSON.stringify(cleanedData);
    const compressed = LZString.compressToBase64(stringified);
    return compressed
}

function strictMigrate(saveObj, template) {
    // saveObj — это plain object из JSON (без Decimal, только строки/числа/объекты)
    // template — может содержать Decimal, функции и т.д., но мы копируем только структуру и значения по умолчанию

    if (saveObj == null || typeof saveObj !== 'object') {
        return template;
    }

    const result = {};
    for (const key in template) {
        const templateVal = template[key];
        if (key in saveObj) {
            const saveVal = saveObj[key];
            if (
                templateVal === null ||
                typeof templateVal !== 'object' ||
                templateVal instanceof Decimal
            ) {
                result[key] = saveVal;
            } else if (Array.isArray(templateVal)) {
                result[key] = Array.isArray(saveVal) ? saveVal : templateVal;
            } else {
                result[key] = strictMigrate(saveVal, templateVal);
            }
        } else {
            result[key] = templateVal;
        }
    }
    return result;
}


function loadGame(com) {
    const compressed = com;
    if (!compressed) return null;

    try {
        const decompressed = LZString.decompressFromBase64(compressed);
        const parsed = JSON.parse(decompressed);
        //
        const migrated = strictMigrate(parsed, preset);
        //
        let revived = reviveDecimals(migrated);  //before - migrated was parsed

        //UPDATE VISIBILITY
        if (new Decimal(revived.number.tier).gte("5e0")) {
            let tierName = capitalizeFirst(cleanOutput(
            numberToLatin(revived.number.tier.toString(), { la_macra: false, la_useard: false, ___showsep: false }, latinTables.latinmacron)
            .replaceAll("<wbr/>", "")
            ))
            const maxLength = 45;
            let displayedTierName = tierName.length > maxLength ? tierName.slice(0, maxLength - 3) + "..." : tierName;
            el("tier").innerHTML = displayedTierName + "nions" + `(ℝ^${(revived.number.tier).toPrecision(3)})`;
            formatNumber("costTier", revived.number.numSys)
        } else {
            el("tier").innerHTML = tierUpData[(revived.number.tier).sub("1e0")].sign
            formatNumber("costTier", tierUpData[revived.number.tier].cost)
        }
        formatNumber("tierBoost", revived.number.tierBoost)
        formatNumber("number", revived.number.value)
        el("notation").innerHTML = `Notation: ${revived.settings.notation}`;
        return revived;
        
    } catch (e) {
        console.error("Failed to load save data:", e);
        return null;
    }
}


window.onload = function() {
    const saved = localStorage.getItem("voidinc");
    const loaded = loadGame(saved);
    if (loaded) {
        player = loaded;
    } else {
        player = reviveDecimals(replaceDecimals(preset));
    }
}