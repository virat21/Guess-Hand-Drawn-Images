import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  Container,
  Button
} from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
function App() {
  let d = null;
  return (
    <div className="App">
      <Header />
      <Container>
        <CanvasDraw
          ref={e => (d = e)}
          brushColor="#000"
        />
        <Button
          onClick={() => {
            let thing = d.getSaveData();
            console.log(d.canvas.drawing);
            d.loadSaveData(thing, false);
          }}
        >
          Test
        </Button>
      </Container>
    </div>
  );
}

export default App;
/*
var imgd = context.getImageData(x, y, width, height);
var pix = imgd.data;

// Loop over each pixel and invert the color.
for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i  ] = 255 - pix[i  ]; // red
    pix[i+1] = 255 - pix[i+1]; // green
    pix[i+2] = 255 - pix[i+2]; // blue
    // i+3 is alpha (the fourth element)
}

// Draw the ImageData at the given (x,y) coordinates.
context.putImageData(imgd, x, y);
*/
