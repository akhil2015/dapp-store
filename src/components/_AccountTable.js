import React from "react";
import MaterialTable from "material-table";

export function AccountTable(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Address", field: "address", editable: "never" }
    ],
    data: props.keys
  });

  return (
    <MaterialTable
      title="Accounts"
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
        pageSize: 3,
        paginationType:"stepped"
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  props.handleUpdate(data)
                  return { ...prevState, data };
                });
              }
              
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                props.handleUpdate(data)
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
