import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "active_score",
    label: "Active_score",
    options: {
      filter: true,
      sort: false,
    }
  },
];

const options = {
};

export default function ActivityTable(props) {

  return (
    <MUIDataTable
      title={props.title}
      data={props.data}
      columns={columns}
      options={options}
    />
  );
}
