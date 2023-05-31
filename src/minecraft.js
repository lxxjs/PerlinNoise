function drawMinecraft() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let colorValue = 0;

  for (let n = 0; n < PN_gridNum; n++) {
    for (let m = 0; m < PN_gridNum; m++) {
      for (let j = 0; j < PN_gridLength; j++) {
        for (let i = 0; i < PN_gridLength; i++) {
          let rawValue =
            (PN_FinalResult[
              n * (PN_gridLength * PN_gridNum) + m * PN_gridLength + j
            ][i] +
              1) *
            128; //0~256
          let modifiedValue = rawValue / 256;
          if (modifiedValue > 0.85) {
            ctx.fillStyle = "#ffffff"; // snow
          } else if (modifiedValue < 0.85 && modifiedValue > 0.485) {
            colorValue = getColorValue((-modifiedValue + 0.9) * 256);
            ctx.fillStyle = "#00" + colorValue + "00";
          } else if (modifiedValue <= 0.485 && modifiedValue > 0.45) {
            ctx.fillStyle = "#fff5bb"; // beach sand
          } else if (modifiedValue <= 0.45) {
            colorValue = getColorValue((modifiedValue + 0.5) * 256);
            ctx.fillStyle = "#0000" + colorValue;
          }
          ctx.fillRect(
            m * PN_cellLength * PN_gridLength + i * PN_cellLength,
            n * PN_cellLength * PN_gridLength + j * PN_cellLength,
            PN_cellLength,
            PN_cellLength
          );
        }
      }
    }
  }
}
