import React, { Component } from "react";
import { getAllModel } from "../../utils/modelProperty";
import PubSub from "pubsub-js";
import ModelCard from "../ModelCard/ModelCard";

export default class AllModels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getAllModel()
    };

    this._updateData = this._updateData.bind(
      this
    );

    this.subToken = null;
  }

  componentDidMount() {
    this.subToken = PubSub.subscribe(
      "modelUpdates",
      this._updateData
    );
  }

  _updateData(_, data) {
    this.setState({ data });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.subToken);
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.data).map(
          (data, index) => {
            return (
              <ModelCard
                key={index}
                value={this.state.data[data]}
                modelKey={data}
              />
            );
          }
        )}
      </div>
    );
  }
}
