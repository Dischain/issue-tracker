'use strict';

import React from 'react';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';

const ControlledInput = React.createClass({
  render() {
    return (
      <FormGroup
        constrolId={this.props.constrolId}
        validationState={this.props.value === '' ? null : this.props.validationState(this.props.value)}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl 
          type={this.props.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        <FormControl.Feedback/>
        <HelpBlock>{this.props.helpBlock}</HelpBlock>
      </FormGroup>
    );
  }
});

export default ControlledInput;