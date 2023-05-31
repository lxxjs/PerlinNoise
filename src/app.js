const PN_gridNum = 10;
const PN_gridLength = 20;
const PN_cellLength = 5;
const PN_randVectorLength = Math.sqrt(2);

let PN_FinalResult = [];
let PN_GridPoint = [];

const toggle = document.getElementById("toggle");
const type = document.getElementById("typeText");
const button = document.getElementById("button");
let ifChecked = false;

toggle.addEventListener("click", (e) => {
  console.log(e.target.checked);
  ifChecked = e.target.checked;
  type.innerText = e.target.checked ? "Minecraft" : "Black  & White";
});

button.addEventListener("click", () => {
  makePerlinNoise();
  {
    ifChecked ? drawMinecraft() : drawBlacknWhite();
  }
});

function randVec() {
  let tempGridPoint = [];
  for (let i = 0; i < PN_gridNum + 1; i++) {
    for (let j = 0; j < PN_gridNum + 1; j++) {
      tempGridPoint.push(Number((2 * Math.PI * Math.random()).toFixed(6)));
    }
    PN_GridPoint.push(tempGridPoint);
    tempGridPoint = [];
  }
}

function interpolate(a, b, x) {
  return a + (b - a) * (3 * Math.pow(x, 2) - 2 * Math.pow(x, 3));
}

function setResult(x, y) {
  let prodResult = [null, null, null, null];
  let scaledX = [null, null, null, null];
  let scaledY = [null, null, null, null];
  let tempInterpolation1, tempInterpolation2;
  let tempResult = [];
  for (let i = 0; i < PN_gridLength; i++) {
    for (let j = 0; j < PN_gridLength; j++) {
      scaledX = [
        (j + 1) / PN_gridLength,
        -(PN_gridLength - 1 - j) / PN_gridLength,
        (j + 1) / PN_gridLength,
        -(PN_gridLength - 1 - j) / PN_gridLength,
      ];
      scaledY = [
        -(i + 1) / PN_gridLength,
        -(i + 1) / PN_gridLength,
        (PN_gridLength - 1 - i) / PN_gridLength,
        (PN_gridLength - 1 - i) / PN_gridLength,
      ];
      prodResult[0] =
        PN_randVectorLength *
        (Math.cos(PN_GridPoint[y][x]) * scaledX[0] +
          Math.sin(PN_GridPoint[y][x]) * scaledY[0]);
      prodResult[1] =
        PN_randVectorLength *
        (Math.cos(PN_GridPoint[y][x + 1]) * scaledX[1] +
          Math.sin(PN_GridPoint[y][x + 1]) * scaledY[1]);
      prodResult[2] =
        PN_randVectorLength *
        (Math.cos(PN_GridPoint[y + 1][x]) * scaledX[2] +
          Math.sin(PN_GridPoint[y + 1][x]) * scaledY[2]);
      prodResult[3] =
        PN_randVectorLength *
        (Math.cos(PN_GridPoint[y + 1][x + 1]) * scaledX[3] +
          Math.sin(PN_GridPoint[y + 1][x + 1]) * scaledY[3]);
      tempInterpolation1 = interpolate(
        prodResult[0],
        prodResult[1],
        j / PN_gridLength
      );
      tempInterpolation2 = interpolate(
        prodResult[2],
        prodResult[3],
        j / PN_gridLength
      );
      //console.log(tempInterpolation1, tempInterpolation2);
      tempResult.push(
        interpolate(tempInterpolation1, tempInterpolation2, i / PN_gridLength)
      );
    }
    PN_FinalResult.push(tempResult);
    tempResult = [];
  }
}

function makePerlinNoise() {
  PN_FinalResult = [];
  PN_GridPoint = [];
  randVec();
  for (let i = 0; i < PN_gridNum; i++) {
    for (let j = 0; j < PN_gridNum; j++) {
      setResult(j, i);
    }
  }
  console.log(PN_FinalResult[0]);
}

function getColorValue(x) {
  // 0 < x < 256
  let units = Math.round(x % 16);
  let tens = Math.floor(x / 16);
  let num = convertTo16(tens) + convertTo16(units); // String
  return num;
}

function convertTo16(x) {
  let numInString = "";
  if (x < 10) {
    numInString += String(x);
  } else {
    switch (x) {
      case 10:
        numInString += "a";
        break;
      case 11:
        numInString += "b";
        break;
      case 12:
        numInString += "c";
        break;
      case 13:
        numInString += "d";
        break;
      case 14:
        numInString += "e";
        break;
      case 15:
        numInString += "f";
        break;
    }
  }
  return numInString;
}

function getMinMax(arr) {
  let min, max;
  let tempMin = [];
  let tempMax = [];
  for (let i = 0; i < PN_FinalResult.length; i++) {
    tempMin.push(Math.min(...arr[i]));
    tempMax.push(Math.max(...arr[i]));
  }
  min = Math.min(...tempMin);
  max = Math.max(...tempMax);
  console.log(min, max);
  return [min, max];
}
