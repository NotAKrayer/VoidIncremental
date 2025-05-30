//GRID SYSTEM BY KRAYER.
//simple and fast grid system for any games.
//create objects with functions. if you want to use it, then credit me.
   
const GRID_SIZE = 50;

const camera = {
  x: 0,
  y: 0,
  isDragging: false,
  lastX: 0,
  lastY: 0
};
    
  const objects = new Map();
  const grid = document.getElementById('grid');

  function updateCamera() {
      
  grid.style.backgroundSize = `${Math.max(GRID_SIZE, window.innerWidth / 49)}px ${Math.max(GRID_SIZE, window.innerWidth / 49)}px`
 
  const bgX = ((-camera.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
  const bgY = ((-camera.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
  grid.style.backgroundPosition = `${bgX}px ${bgY}px`;

  
  objects.forEach((_, obj) => updateObjectPosition(obj));
}

function updateObjectPosition(obj) {
  const isScreenFixed = obj.dataset.screen === 'true';
      
  let screenX, screenY;

  if (isScreenFixed) {
    screenX = parseFloat(obj.dataset.worldX);
    screenY = parseFloat(obj.dataset.worldY);
    } else {
    const worldX = parseFloat(obj.dataset.worldX);
    const worldY = parseFloat(obj.dataset.worldY);
    screenX = worldX - camera.x;
    screenY = worldY - camera.y;
  }
  obj.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;

  const visiblePadding = 250;
  const isVisible =
    screenX > -visiblePadding &&
    screenX < window.innerWidth + visiblePadding &&
    screenY > -visiblePadding &&
    screenY < window.innerHeight + visiblePadding;

    obj.style.display = isVisible ? 'block' : 'none';
}
  
const handleMouseDown = e => {
  camera.isDragging = true;
  camera.lastX = e.clientX;
  camera.lastY = e.clientY;
  document.body.classList.add('grabbing');
};

const handleMouseMove = e => {
  if (!camera.isDragging) return;
    const dx = -(e.clientX - camera.lastX);
    const dy = -(e.clientY - camera.lastY);
    camera.x += dx;
    camera.y += dy;
    camera.lastX = e.clientX;
    camera.lastY = e.clientY;
    updateCamera();
  };

  const handleMouseUp = () => {
    camera.isDragging = false;
    document.body.classList.remove('grabbing');
  };
  const handleTouchStart = e => {
  if (e.touches.length === 1) {
    camera.isDragging = true;
    camera.lastX = e.touches[0].clientX;
    camera.lastY = e.touches[0].clientY;
  }
};

const handleTouchMove = e => {
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
};

  const handleTouchEnd = e => {
  if (e.touches.length === 0) {
    camera.isDragging = false;
  }
};

function createObject(x, y, content = null) {
  const obj = document.createElement('div');
  obj.className = 'obj';
  obj.innerHTML = content || `
    <button>Object</button>
    <div style="font-size: 10px; color: #fff; margin-top: 5px">${x},${y}</div>
  `;
  obj.dataset.worldX = x;
  obj.dataset.worldY = y;
  document.body.appendChild(obj);
  objects.set(obj, { x, y });
  updateObjectPosition(obj);
  return obj;
}

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mouseleave', handleMouseUp);

document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('touchcancel', handleTouchEnd);

updateCamera();