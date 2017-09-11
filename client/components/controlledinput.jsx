'use strict';

import React from 'react';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';

const ControlledInput = React.createClass({
  getInitialState() {
    return { value: '' };
  },

  handleChange(event) {
    this.setState({ value: event.target.value });
  },

  render() {
    return (
      <FormGroup
        constrolId={this.props.constrolId}
        validationState={this.props.validationState(this.state.value)}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl 
          type={this.props.type}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <FormControl.Feedback/>
        <HelpBlock>{this.props.helpBlock}</HelpBlock>
      </FormGroup>
    );
  }
});

export default ControlledInput;