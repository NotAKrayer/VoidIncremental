function el(id) {
    let a = document.getElementById(id);
    return a
}

function isMobileDevice() {
  return window.matchMedia("only screen and (max-width: 767px)").matches;
}