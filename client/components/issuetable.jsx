'use strict';

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const IssueTable = React.createClass({
  render() {
    let issueRows = this.props.issues.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.issueId}</td>
          <td>{item.title}</td>
          <td>{item.status}</td>
          <td>{item.ownerId}</td>
        </tr>
      );
    });
    return (
      <table className={'table table-bordered table-hover'}>
        <tr>
          <th>issueId</th>
          <th>title</th>
          <th>status</th>
          <th>ownerId</th>
        </tr>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );

    // return (
    //   <BootstrapTable  data={this.props.issues}>
    //     <TableHeaderColumn dataField='issueId' dataSort={true}>
    //       Id
    //     </TableHeaderColumn>
    //     <TableHeaderColumn dataField='title' dataSort={true}>
    //       Title
    //     </TableHeaderColumn>
    //     <TableHeaderColumn dataField='status' dataSort={true}>
    //       Status
    //     </TableHeaderColumn>
    //     <TableHeaderColumn dataField='ownerId' dataSort={true}>
    //       Owner
    //     </TableHeaderColumn>
    //   </BootstrapTable>
    // );
  }
});

export default IssueTable;