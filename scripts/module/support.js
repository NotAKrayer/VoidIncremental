function el(id) {
    let a = document.getElementById(id);
    return a
}

function isMobileDevice() {
  return window.matchMedia("only screen and (max-width: 767px)").matches;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function cleanOutput(str) {
  // Remove any non-alphanumeric characters except spaces and hyphens
  return str.replace(/[^a-zA-Z0-9\s-]/g, "");
} 

let set = "exp";    //suff - m, b, t, qa, qi //exp = 1e2 for example

function formatNumber(id, number) {
  let num;
  if (number instanceof Decimal) {
    num = number;
  } else {
    num = new Decimal(number);
  }
  if (set === "exp") {
    if (num.lt("1e1000")) {
      el(id).innerHTML = num.toPrecision(3);
    } else{
      el(id).innerHTML = num.toString().replace(/(\.\d{3})\d+/, '$1');
    }
  } else if (set === "suff") {
    if (num.gte("1e3")) {
      let converted = AAS(num);
      el(id).innerHTML = converted;
    } else {
      el(id).innerHTML = num.toPrecision(3);
    }
  }
}

//fixing bug with aas more than 9 symbols broke :(