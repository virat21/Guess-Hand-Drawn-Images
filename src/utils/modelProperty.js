import camelCase from "lodash.camelcase";
import PubSub from "pubsub-js";
import uuidv4 from "uuidv4";
import { trainNeuralNetwork } from "./ml";

export function getAllModel() {
  return JSON.parse(
    localStorage.getItem("_models") || "{}"
  );
}
export function setAllModel(models) {
  localStorage.setItem(
    "_models",
    JSON.stringify(models)
  );

  PubSub.publish("modelUpdates", models);
}
export function isExits(key) {
  return (
    Object.keys(getAllModel()).indexOf(key) >= 0
  );
}

export function getAllNames() {
  let all = getAllModel();
  all = Object.keys(all).map(d => ({
    value: all[d],
    key: d
  }));
  return all;
}

export function addToModel(_string) {
  let cc = camelCase(_string);
  if (!isExits(cc)) {
    let all = getAllModel();
    all[cc] = _string;
    console.log(all);
    setAllModel(all);
  }
}

export function storeDrawing(
  Modelkey,
  drawing_array
) {
  let model = getDrawing(Modelkey);
  model.push({
    drawing: drawing_array,
    id: uuidv4()
  });
  localStorage.setItem(
    "_MD" + Modelkey,
    JSON.stringify(model)
  );
  PubSub.publish("_" + Modelkey, model);
  trainNeuralNetwork(trainModel()).then(res => {
    console.log(res, "retrain");
  });
}

export function getDrawing(Modelkey) {
  return JSON.parse(
    localStorage.getItem("_MD" + Modelkey) || "[]"
  );
}

export function trainModel() {
  return Object.keys(getAllModel())
    .map(d => {
      return getDrawing(d).map(num => ({
        input: num.drawing,
        output: { [d]: 1 }
      }));
    })
    .flat(1);
}
