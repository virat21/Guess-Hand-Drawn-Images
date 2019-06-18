import brain from "brain.js";
import { trainModel } from "./modelProperty";

let neuralNetwork = null;

export function getNeuralNetwork() {
  if (!neuralNetwork) {
    neuralNetwork = new brain.NeuralNetwork();
  }

  return neuralNetwork;
}

export function trainNeuralNetwork() {
  neuralNetwork = null;
  return new Promise((res, rej) => {
    getNeuralNetwork()
      .trainAsync(trainModel())
      .then(() => {
        res(neuralNetwork);
      });
  });
}

export function guessDrawing(data) {
  return brain.likely(data, getNeuralNetwork());
}
