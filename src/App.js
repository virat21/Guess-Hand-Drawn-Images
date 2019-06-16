import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  Container,
  Button
} from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
import { convertImageToArray } from "./utils/convertImageToArray";
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
            convertImageToArray(
              d.canvas.drawing
            ).then(data => {
              console.log(data);
            });
          }}
        >
          Convert To Array
        </Button>
      </Container>
    </div>
  );
}

export default App;
