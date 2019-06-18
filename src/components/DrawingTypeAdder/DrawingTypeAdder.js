import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";
import { addToModel } from "../../utils/modelProperty";

export default class DrawingTypeAdder extends Component {
  text = "";
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Header>
              Add New Hand Drawn Property
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={e => e.preventDefault()}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    Enter Hand Drawn Name
                  </Form.Label>
                  <Form.Control
                    onChange={e => {
                      this.text = e.target.value;
                    }}
                    ref={e =>
                      (this.textinput = e)
                    }
                    type="text"
                    placeholder="Enter Hand Drawn Name"
                  />
                  <Form.Text className="text-muted">
                    e.g. One
                  </Form.Text>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    addToModel(this.text);
                    this.textinput.value = "";
                    this.text = "";
                  }}
                >
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
