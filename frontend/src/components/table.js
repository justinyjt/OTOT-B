import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { axiosInstance } from "../utils/axios.utils";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "_id", headerName: "ID", flex: 2 },
];

export default function DataTable() {
  const [contactList, setContactList] = React.useState([]);
  const getList = () => {
    axiosInstance.get("/api/contacts").then((res) => {
      console.log("hi", res)
      setContactList(res.data.data);
    });
  };

  React.useEffect(() => getList, []);

  return (
    <div>
      <div style={{ height: 650, width: "90vh" }}>
        <DataGrid
          rows={contactList}
          getRowId={(row => row._id)}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
      <div>
        <input type="button" value="Refresh list" onClick={getList} />
      </div>
    </div>
  );
}