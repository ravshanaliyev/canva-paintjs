const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
console.log(fillColor);

let contex = canvas.getContext("2d");
let isDrawing = false;
let brushWidth = 5;
let selectedTool = "brush";
let previousMouseX, previousMouseY, snapshot;
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
const startDraw = (e) => {
  isDrawing = true;
  previousMouseX = e.offsetX;
  previousMouseY = e.offsetY;
  contex.beginPath();
  contex.lineWidth = brushWidth;
  snapshot = contex.getImageData(0, 0, canvas.width, canvas.height);
};
const drawRectangle = (e) => {
  if (!isDrawing) return;
  fillColor.checked
    ? contex.fillRect(
        e.offsetX,
        e.offsetY,
        previousMouseX - e.offsetX,
        previousMouseY - e.offsetY
      )
    : contex.strokeRect(
        e.offsetX,
        e.offsetY,
        previousMouseX - e.offsetX,
        previousMouseY - e.offsetY
      );
};
const drawCircle = (e) => {
  contex.beginPath();
  const radius = Math.sqrt(
    Math.pow(previousMouseX - e.offsetX, 2) +
      Math.pow(previousMouseY - e.offsetY, 2)
  );
  contex.arc(previousMouseX, previousMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? contex.fill() : contex.stroke();
};
const drawTriangle = (e) => {
  contex.beginPath();
  contex.moveTo(previousMouseX, previousMouseY);
  contex.lineTo(e.offsetX, e.offsetY);
  contex.lineTo(previousMouseX * 2 - e.offsetX, e.offsetY);
  contex.closePath();
  fillColor.checked ? contex.fill() : contex.stroke();
};
const drawing = (e) => {
  if (!isDrawing) return;
  contex.putImageData(snapshot, 0, 0);
  switch (selectedTool) {
    case "brush":
      contex.lineTo(e.offsetX, e.offsetY);
      contex.stroke();
      break;
    case "rectangle":
      drawRectangle(e);
      break;
    case "circle":
      drawCircle(e);
      break;
    case "triangle":
      drawTriangle(e);
      break;
  }
};
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", drawing);
