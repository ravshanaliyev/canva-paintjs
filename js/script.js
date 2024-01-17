const canvas = document.querySelector("canvas");

let contex = canvas.getContext("2d");
let isDrawing = false;
let brushWidth = 100;
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
const startDraw = (e) => {
  isDrawing = true;
  contex.beginPath();
  contex.moveTo(e.offsetX, e.offsetY);
};
const drawing = (e) => {
  if (!isDrawing) return;
  contex.lineTo(e.offsetX, e.offsetY);
  contex.stroke();
  contex.lineWidth = brushWidth;
};
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", drawing);
