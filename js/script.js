const canvas = document.querySelector("canvas");

let contex = canvas.getContext("2d");
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
const drawing = (e) => {
  contex.lineTo(e.offsetX, e.offsetY);
  contex.stroke();
};
canvas.addEventListener("mousemove", drawing);
