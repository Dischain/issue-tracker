'use strict';

import React from 'react';
import { Row } from 'react-bootstrap';

const Footer = React.createClass({
  render() {
    // return (
    //   <footer className={'footer'}>
    //     <p className={'text-muted'}>Issue Tracker, 2017</p>
    //   </footer>
    // );
    // return (
    //   <footer className={'page-footer blue center-on-small-only'}>
    //     <div className={'footer-copyright'}>
    //       <div className={'container-fluid'}>
    //         Issue Tracker, 2017. No any fuckin` copyrights
    //       </div>
    //     </div>
    //   </footer>
    // );
    // return (
    //   <footer className={'footer page-footer footer-copyright'}>
    //     <p className={'text-muted'}>Issue Tracker, 2017. No any fuckin` copyrights</p>
    //   </footer>
    // );
    return (
      <footer className={'navbar-fixed-bottom row-fluid'}>
        <p className={'text-muted'}>Issue Tracker, 2017. No any fuckin` copyrights</p>
      </footer>
    );
  }
});

export default Footer;