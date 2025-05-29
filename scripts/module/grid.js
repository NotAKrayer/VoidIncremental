// GRID SYSTEM BY KRAYER (OPTIMIZED VERSION)
const GRID_SIZE = 50;
const VISIBLE_PADDING = 250;

const camera = {
x: 0,
y: 0,
isDragging: false,
lastX: 0,
lastY: 0
};

const objects = [];
const grid = document.getElementById('grid');
const gridStyle = grid.style;

function updateCamera() {
requestAnimationFrame(() => {
const scale = Math.max(GRID_SIZE, window.innerWidth / 49);
gridStyle.backgroundSize = `${scale}px ${scale}px`;

const bgX = ((-camera.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
const bgY = ((-camera.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
gridStyle.backgroundPosition = `${bgX}px ${bgY}px`;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

for (let i = 0; i < objects.length; i++) {
const obj = objects[i];
let screenX, screenY;

if (obj.screenFixed) {
screenX = obj.worldX;
screenY = obj.worldY;
} else {
screenX = obj.worldX - camera.x;
screenY = obj.worldY - camera.y;
}

obj.element.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;

if (!obj.screenFixed) {
obj.element.style.display = (
screenX > -VISIBLE_PADDING &&
screenX < screenWidth + VISIBLE_PADDING &&
screenY > -VISIBLE_PADDING &&
screenY < screenHeight + VISIBLE_PADDING
) ? 'block' : 'none';
}
}
});
}

function createObject(x, y, content = null, screenFixed = false) {
const objElement = document.createElement('div');
objElement.className = 'obj';

if (content) {
objElement.innerHTML = content;
} else {
objElement.innerHTML = `
<button>Object</button>
<div style="font-size: 10px; color: #fff; margin-top: 5px">${x},${y}</div>
`;
}

document.body.appendChild(objElement);

const obj = {
element: objElement,
worldX: x,
worldY: y,
screenFixed: screenFixed
};

objects.push(obj);
updateObjectPosition(obj);
return objElement;
}

// Mouse event handlers
function handleMouseDown(e) {
camera.isDragging = true;
camera.lastX = e.clientX;
camera.lastY = e.clientY;
document.body.classList.add('grabbing');
}

function handleMouseMove(e) {
if (!camera.isDragging) return;

const dx = -(e.clientX - camera.lastX);
const dy = -(e.clientY - camera.lastY);

camera.x += dx;
camera.y += dy;

camera.lastX = e.clientX;
camera.lastY = e.clientY;

updateCamera();
}

function handleMouseUp() {
camera.isDragging = false;
document.body.classList.remove('grabbing');
}

// Touch event handlers
function handleTouchStart(e) {
if (e.touches.length === 1) {
camera.isDragging = true;
camera.lastX = e.touches[0].clientX;
camera.lastY = e.touches[0].clientY;
}
}

function handleTouchMove(e) {
if (e.touches.length === 1 && camera.isDragging) {
const touch = e.touches[0];
const dx = -(touch.clientX - camera.lastX);
const dy = -(touch.clientY - camera.lastY);

camera.x += dx;
camera.y += dy;

camera.lastX = touch.clientX;
camera.lastY = touch.clientY;

updateCamera();
}
e.preventDefault();
}

function handleTouchEnd(e) {
if (e.touches.length === 0) {
camera.isDragging = false;
}
}

function updateObjectPosition(obj) {
let screenX, screenY;

if (obj.screenFixed) {
screenX = obj.worldX;
screenY = obj.worldY;
} else {
screenX = obj.worldX - camera.x;
screenY = obj.worldY - camera.y;
}

obj.element.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;

if (!obj.screenFixed) {
const isVisible = (
screenX > -VISIBLE_PADDING &&
screenX < window.innerWidth + VISIBLE_PADDING &&
screenY > -VISIBLE_PADDING &&
screenY < window.innerHeight + VISIBLE_PADDING
);
obj.element.style.display = isVisible ? 'block' : 'none';
}
}

// Event listeners
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mouseleave', handleMouseUp);

document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('touchcancel', handleTouchEnd);

// Initial update
updateCamera();

// Handle window resize
window.addEventListener('resize', updateCamera);