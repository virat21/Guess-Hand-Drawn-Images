import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Container } from "react-bootstrap";
import DrawBox from "./components/DrawBox/DrawBox";
import DrawingTypeAdder from "./components/DrawingTypeAdder/DrawingTypeAdder";
import AllModels from "./components/AllModels/AllModels";
import { trainNeuralNetwork } from "./utils/ml";
import { preloadModels } from "./utils/preloadModels";
preloadModels();
trainNeuralNetwork().then(res => {
  console.log(res, "done");
});

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <DrawBox />
        <DrawingTypeAdder />
        <hr />
        <AllModels />
      </Container>
    </div>
  );
}

export default App;
