export const convertImageToArray = canvas => {
  return new Promise((res, rej) => {
    let img = new Image();
    img.src = canvas.toDataURL();

    img.onload = () => {
      let tempCanvas = document.createElement(
        "canvas"
      );

      tempCanvas.width = 28;
      tempCanvas.height = 28;
      let ctx = tempCanvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 28, 28);

      let pixels = ctx.getImageData(0, 0, 28, 28)
        .data;
      let newpixels = [];
      for (
        var i = 0, n = pixels.length;
        i < n;
        i += 4
      ) {
        newpixels.push(pixels[i + 3] ? 1 : 0);
      }

      res(newpixels);
    };
  });
};
