   //GRID SYSTEM BY KRAYER (WITH COMMENTARIES).
   //simple and fast grid system for any games.
   
   
   // Constant grid base size
    const GRID_SIZE = 50;

    // Camera object now only tracks panning. Scale is fixed at 1.
    const camera = {
      x: 0,
      y: 0,
      scale: 1,  // Fixed value
      isDragging: false,
      lastX: 0,
      lastY: 0
    };
    
    // Map for storing objects with their world coordinates
    const objects = new Map();
    const grid = document.getElementById('grid');

    // Update the camera transformation:
    // Adjust the grid background position and update all objects’ positions.
    function updateCamera() {
      // Grid background remains at fixed size
      grid.style.backgroundSize = `${Math.max(GRID_SIZE, window.innerWidth / 49)}px ${Math.max(GRID_SIZE, window.innerWidth / 49)}px`
      // Compute background offset so the grid appears to move with the camera panning.
      const bgX = ((-camera.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      const bgY = ((-camera.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      grid.style.backgroundPosition = `${bgX}px ${bgY}px`;

      // Update each object's screen position.
      objects.forEach((_, obj) => updateObjectPosition(obj));
    }

    // Update an individual object's position based on its world coordinates and camera pan.
    function updateObjectPosition(obj) {
      const isScreenFixed = obj.dataset.screen === 'true';
      
      let screenX, screenY;

      if (isScreenFixed) {
        // Если объект закреплён за экран, используем worldX/Y как абсолютные пиксели на экране
        screenX = parseFloat(obj.dataset.worldX);
        screenY = parseFloat(obj.dataset.worldY);
      } else {
        // Обычный объект: учитываем камеру
        const worldX = parseFloat(obj.dataset.worldX);
        const worldY = parseFloat(obj.dataset.worldY);
        screenX = worldX - camera.x;
        screenY = worldY - camera.y;
      }

      // Применяем трансформацию
      obj.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;

      // Проверка видимости (для screen-fixed можно её отключить)
      const visiblePadding = 250;
      const isVisible =
        screenX > -visiblePadding &&
        screenX < window.innerWidth + visiblePadding &&
        screenY > -visiblePadding &&
        screenY < window.innerHeight + visiblePadding;

      obj.style.display = isVisible ? 'block' : 'none';
    }
    // Mouse event handlers for desktop panning.
    const handleMouseDown = e => {
      camera.isDragging = true;
      camera.lastX = e.clientX;
      camera.lastY = e.clientY;
      document.body.classList.add('grabbing');
    };

    const handleMouseMove = e => {
      if (!camera.isDragging) return;
      // Invert movement so that dragging the view works naturally.
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

    // Touch event handlers for mobile panning.
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
      // Prevent default to avoid scrolling on touch devices.
      e.preventDefault();
    };

    const handleTouchEnd = e => {
      if (e.touches.length === 0) {
        camera.isDragging = false;
      }
    };

    // Object creation function remains unchanged.
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

    // Create an initial welcome panel.
    const welcomePanel = createObject(1000, 500, `
      <div style="width: 400px; padding: 20px; border-radius: 8px; color: white;">
        <h2 style="margin: 0 0 15px 0; text-align: center;">Добро пожаловать!</h2>
        <p style="font-size: 14px;">
          Это стартовая панель. Вы можете перетаскивать пространство ЛКМ или одним пальцем.
        </p>
      </div>
    `);

    // Add event listeners for desktop controls.
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    // Add event listeners for mobile controls.
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    // Initial camera update.
    updateCamera();