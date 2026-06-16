let temp = {
    number: {
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
        numSys: new Decimal("5e2"),
        axioms: [0, 0, 0, 0],

        axiomsMult: new Decimal(1),
        nps: new Decimal(0),
        canTierUp: false
    }
}

function updateTemp() {
    const pNum = player.number
    temp.number.value = pNum.value
    temp.number.tier = pNum.tier
    temp.number.tierBoost = pNum.tierBoost
    temp.number.numSys = pNum.numSys
    temp.number.axioms = [...pNum.axioms]

    let mult = new Decimal(1)

    if (temp.number.axioms[0] == 1) {
        mult = mult.plus(1)
    }

    if (temp.number.axioms[1] == 1) {
        let axioms2Boost = new Decimal(1).plus((temp.number.tierBoost.sqrt(2)).divide(10))
        mult = mult.mul(axioms2Boost)
    }

    if (temp.number.axioms[2] == 1) {
        mult = mult.mul(temp.number.tierBoost).mul(1.5)
    } else {
        mult = mult.mul(temp.number.tierBoost)
    }

    temp.number.axiomsMult = mult
    temp.number.nps = mult

    let currentTier = temp.number.tier;
    if (currentTier.gte(5)) {
        temp.number.canTierUp = temp.number.value.gte(temp.number.numSys);
    } else {
        if (currentTier.toNumber() < tierUpData.length) {
             let nextTierData = tierUpData[currentTier.toNumber()];
             if (currentTier.gte(nextTierData.need)) {
                 temp.number.canTierUp = temp.number.value.gte(nextTierData.cost);
             } else {
                 temp.number.canTierUp = false;
             }
        } else {
            temp.number.canTierUp = false;
        }
    }
}