'use strict';

import React from 'react';
import { Row } from 'react-bootstrap';

const Sidebar = React.createClass({
  render() {
    return (
      <div className='col-sm-3'>
        <ul>
          <li>{this.props.curUser.email}</li>
        </ul>
      </div>
    );
  }
});

export default Sidebar;