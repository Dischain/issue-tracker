'use strict';

import React from 'react';

const User = React.createClass({
  render() {
    console.log(this.props);
    console.log(this.context);
    return (
      <div>Hello, this is user page</div>
    );
  }
});

export default User;