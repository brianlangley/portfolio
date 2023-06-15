// Declaration of canvas and 2D rendering context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // Provides the 2D rendering context for the drawing surface of a <canvas> element.

// Set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Styling properties of spray
ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

// Drawing state
let isDrawing = false;

// Last mouse position
// Stores the coordinates of the mouse pointer relative to the top-left corner of the document, not including any scroll offset
let lastX = 0;
let lastY = 0;

// Colour variations
let hue = 0;
// Hue incrementations
let direction = true;

// Draw function
const draw = e => {
    if (!isDrawing) return; // Stop the function from running when they are not moused down

    // Drawing process begins
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // Draws a path from the last known position to the current position of the mouse
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Start from (lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY); // Go to (e.offsetX, e.offsetY) (current position of the mouse)
    ctx.stroke(); // Draws the path defined by moveTo() and lineTo()

    // Once the path is drawn, update the last known position of the mouse
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // Increment hue to change colour
    hue++;

    // Resetting hue if it reaches 360
    hue = (hue >= 360) ? 0 : hue;
};

const clearCanvas = () => {
    // Clears canvas whenever called
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners
canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update last known position of the mouse
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    setTimeout(() => {
        if (!isDrawing) {
            clearCanvas();
        }
    }, 5000);
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    setTimeout(() => {
        if (!isDrawing) {
            clearCanvas();
        }
    }, 5000);
});
