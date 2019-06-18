import React, { Component } from "react";
import {
  Row,
  Button,
  Col,
  Modal
} from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
import { convertImageToArray } from "../../utils/convertImageToArray";
import {
  getAllNames,
  storeDrawing,
  getAllModel
} from "../../utils/modelProperty";
import { guessDrawing } from "../../utils/ml";

export default class DrawBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      isConverting: false,
      currentOption: getAllNames()[0].key,
      currentData: null
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(
      this
    );
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Row
        style={{
          margin: "20px 0px"
        }}
      >
        <Col
          md={{ span: 4, offset: 4 }}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <CanvasDraw
            ref={e => (this.canvasContainer = e)}
            brushColor="#000"
            style={{
              boxShadow:
                "rgba(96, 125, 139, 0.48) 0px 12px 53px -14px"
            }}
          />
          <Row
            style={{
              margin: "20px 0px"
            }}
          >
            <Col>
              <Button
                style={{
                  margin: "0px 10px"
                }}
                onClick={() => {
                  convertImageToArray(
                    this.canvasContainer.canvas
                      .drawing
                  ).then(data => {
                    console.log(data);
                    this.setState(
                      { currentData: data },
                      () => {
                        this.handleShow();
                      }
                    );
                  });
                }}
              >
                Add to Model
              </Button>
              <Button
                style={{
                  margin: "0px 10px"
                }}
                onClick={() => {
                  convertImageToArray(
                    this.canvasContainer.canvas
                      .drawing
                  ).then(data => {
                    let result = guessDrawing(
                      data
                    );
                    alert(
                      "🤖 : " +
                        getAllModel()[result]
                    );
                  });
                }}
              >
                Guess
              </Button>
              <Button
                onClick={() => {
                  this.canvasContainer.clear();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Col>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Add To Model
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              onChange={e => {
                this.setState({
                  currentOption: e.target.value
                });
              }}
              value={this.state.currentOption}
            >
              {getAllNames().map((d, i) => (
                <option key={i} value={d.key}>
                  {d.value}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log(
                  this.state.currentOption
                );
                this.canvasContainer.clear();
                this.handleClose();
                storeDrawing(
                  this.state.currentOption,
                  this.state.currentData
                );
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    );
  }
}
