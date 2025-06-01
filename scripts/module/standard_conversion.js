//BIG THANKS TO AAREX FOR THIS SCRIPT!!!!!!!!!!!!!!!!!!!!!!!!

var smallAbbs = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QtQd', 'SxQd', 'SpQd', 'OQd', 'NQd', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QaNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];

function toTier1Abb(t1, t2, aas) {
	let prefixes = aas ? [
		["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
		["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
		["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]
	] : [
		['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
		['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
		['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']
	]
	let o = t1 % 10
	let t = Math.floor(t1 / 10) % 10
	let h = Math.floor(t1 / 100) % 10

	let r = ""
	if (t1 > 1 || t2 == 0) r = prefixes[0][o] + prefixes[1][t] + prefixes[2][h]
	if (t2 != "root") r += toTier2Abb(t2, 0, aas)

	return r
}

function toTier2Abb(t2, t3 = 0, aas) {
	if (!t2) return ""

	let prefixes2 = [
		["", "Mi", "Mc", "Na", "Pc", "Fe", "At", "Zp", "Yc", "Xn"],
		["", "Me", "Du", "Tr", "Te", "P", "Hx", "Hp", "Ot", "E"],
		["", "c", "Ic", "Tcn", "Trc", "Pcn", "Hcn", "Hpc", "Ocn", "Ecn"],
		["", "Hc", "Dh", "Th", "Trh", "Ph", "Hh", "Hph", "Oh", "Eh"]
	]

	let r = ''

	if (t2 > 1 || t3 == 0) {
		if (t2 < 10) return standardize(prefixes2[0][t2] + toTier3Abb(t3), aas)
		if (t2 % 100 == 10) r = 'V'
		else r = prefixes2[1][t2 % 10]
		if (!aas || (t2 <= 10 || t2 >= 20)) r += prefixes2[2][Math.floor(t2 / 10) % 10]
		r += prefixes2[3][Math.floor(t2 / 100)]
	}
	r = standardize(r + toTier3Abb(t3), aas)
	return r
}

function toTier2AbbFull(t2, aas) {	
	var r = ""
	if (t2 > 102) {
		var s3 = 0
		while (t2 > 0) {
			partS = t2 % 1000
			if (partS > 0) r = toTier2Abb(partS, s3, aas) + (r ? 'a-' + r : '')
			t2 = Math.floor(t2/1000)
			s3++
		}
	} else r = toTier2Abb(t2, 0, aas)
	return r
}

function toTier3Abb(t3, t4 = 0, aas) {
	if (!t3) return ""
	return (["", "Ka", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk"])[t3]
}

function standardize(x, aas) {
	if (!aas) x = x.toUpperCase()
	return x
}

function AAS(value) {
	var exponent = value.e
	var mantissa = (value.m * Math.pow(10, exponent % 3)).toFixed(Math.max(2 - exponent % 3, 0))
	if (parseFloat(mantissa) == 1e3) {
		mantissa = (1).toFixed(2)
		exponent += 3
	}
	return (exponent < 3e9 + 3 ? mantissa + " " : "") + getAASAbbreviation(Math.floor(exponent / 3) - 1)
}

function getAASAbbreviation(x) {
	if (x < 3) return ["k", "M", "B"][x]

	var result = ''
	e2 = 0
	while (x > 0) {		
		var partE = x % 1000
		if (partE > 0) result = toTier1Abb(partE, e2, true) + (result ? '-' + result : '')
		x = Math.floor(x / 1000)
		e2++
	}
	return result
}