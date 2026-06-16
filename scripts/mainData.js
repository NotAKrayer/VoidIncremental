let player = {
    number: {
        version: 1,
        value: new Decimal(0),
        tier: new Decimal(0),
        tierBoost: new Decimal(0),
        numSys: new Decimal("5e2"),
        axioms: [0, 0, 0, 0]
    },
    settings: {
        notation: "Mixed"
    }
}

let otherData = {
    axiomsCost: [new Decimal("1e2"), new Decimal("1e3"), new Decimal("1.5e3")]
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