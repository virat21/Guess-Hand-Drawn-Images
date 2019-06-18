import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getDrawing } from "../../utils/modelProperty";
import PubSub from "pubsub-js";
import DrawingPreview from "../DrawingPreview/DrawingPreview";

export default class ModelCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getDrawing(props.modelKey)
    };

    this._updateData = this._updateData.bind(
      this
    );

    this.subToken = null;
  }
  static defaultProps = {
    value: "Default Value",
    modelKey: ""
  };

  componentDidMount() {
    this.subToken = PubSub.subscribe(
      "_" + this.props.modelKey,
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
      <Row
        style={{
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <Col>
          <Card>
            <Card.Header>
              {this.props.value}
            </Card.Header>
            <Card.Body>
              {this.state.data.map(
                (data, index) => {
                  return (
                    <DrawingPreview
                      key={index}
                      {...data}
                    />
                  );
                }
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
