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
