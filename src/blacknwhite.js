function drawBlacknWhite() {
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
          colorValue = getColorValue(rawValue);
          ctx.fillStyle = "#" + colorValue + colorValue + colorValue;
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
