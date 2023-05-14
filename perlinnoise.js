const totalCellNum = 200;
const totalGridPointNum = 25;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = totalCellNum * 2;
canvas.height = totalCellNum * 2;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, totalCellNum, totalCellNum);
ctx.strokeStyle = "#000000";
for (let i = 0; i < 5; i++) {
  ctx.beginPath();
  ctx.moveTo(i * 50 + 100, 100);
  ctx.lineTo(i * 50 + 100, totalCellNum + 100);
  ctx.stroke();
}
for (let i = 0; i < 5; i++) {
  ctx.beginPath();
  ctx.moveTo(100, i * 50 + 100);
  ctx.lineTo(totalCellNum + 100, i * 50 + 100);
  ctx.stroke();
}

let finalResult = [];
let gridPointGradient = [];

function createRandomGradient() {
  for (let i = 0; i < totalGridPointNum; i++) {
    gridPointGradient.push(2 * Math.PI * Math.random());
  }
}

function getDestinationCoordinate(x, y, theta, length) {
  const destX = Math.cos(theta) * length + x;
  //Math.cos(theta) = Math.sqrt(Math.pow(destX - x, 2)) / length
  const destY = Math.sin(theta) * length + y;
  return [destX, destY];
}

createRandomGradient();
console.log(gridPointGradient);

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    let [x, y] = getDestinationCoordinate(
      j * 50 + 100,
      i * 50 + 100,
      gridPointGradient[j + i * 5],
      Math.sqrt(2) * 50
    );
    ctx.beginPath();
    ctx.moveTo(j * 50 + 100, i * 50 + 100);
    ctx.lineTo(x + 100, y + 100);
    ctx.stroke();
  }
}
