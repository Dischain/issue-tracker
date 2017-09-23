'use strict';

import React from 'react';
import { Row } from 'react-bootstrap';

const Sidebar = React.createClass({
  render() {
    return (
      <div className={'sidebar'}>
        <div className={'sidebar-header'}>
          <h3>{this.props.curUser.userName}</h3>
        </div>

        <ul className={'list-unstyled components'}>
          <li className={'active'}>
          {this.props.curUser.email}
          </li>
        </ul>
      </div>
    );
  }
});

export default Sidebar;