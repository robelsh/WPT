import React, {Component} from "react";
import {Col,Row,ButtonToolbar,Button} from "react-bootstrap";

export default class Question extends Component{

  render() {
    return(
      <Row className="show-grid">
        <Col xs={12} md={12} xs={12}>{this.props.msg}</Col>
        <Col xs={12} md={12} xs={12}>
          <ButtonToolbar>
            {this.props.answers.map((answers, index) =>
              <Button onTouchTap={(e)=>this.props.vote(index,this.props.index)}>{answers}</Button>
            )}
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}
