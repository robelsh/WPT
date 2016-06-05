import React, {Component} from "react";
import {Col,Row,ButtonToolbar,Button} from "react-bootstrap";

export default class Question extends Component{

  render() {
    return(
      <Row className="show-grid">
        <Col xs={12} md={12} xs={12}>{this.props.msg}</Col>
        <Col xs={12} md={12} xs={12}>
          <ButtonToolbar>
            <Button>ok</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}
