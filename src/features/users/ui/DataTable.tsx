import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId, GridSelectionModel } from "@mui/x-data-grid";
import { Tab } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import { fetchUsers, removeUsers, updateUsers } from "../bll/usersSlice";
import { selectUsers } from "../bll/usersSelectors";
import { Status } from "../../../common/enum/status";
import { selectorUserAuthName } from "../../auth/bll/authSelectors";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../common/enum/path";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 235 },
  { field: "name", headerName: "Name", width: 235 },
  { field: "email", headerName: "E-mail", width: 235 },
  { field: "createdAt", headerName: "Signup date", type: "dateTime", width: 235 },
  { field: "timeLastLogin", headerName: "Login date", type: "dateTime", width: 235 },
  { field: "status", headerName: "Status", width: 235 }
];

export const DataTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isAuth = useAppSelector(selectorUserAuthName);
  const navigate = useNavigate();

  const [checkedIds, setCheckedIds] = useState<GridRowId[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!isAuth) {
    navigate(`${Path.Login}`);
  }

  const rowSelection = (usersIds: GridRowId[]) => {
    setCheckedIds(usersIds);
  };

  const handelDeleteUsers = () => {
    dispatch(removeUsers({ id: checkedIds as string[] }));
  };
  const handelBlockUsers = () => {
    dispatch(updateUsers({ id: checkedIds as string[], data: Status.Block }));
  };
  const onUnblockUsers = () => {
    dispatch(updateUsers({ id: checkedIds as string[], data: Status.Unblock }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div>
        <Tab icon={<LockOutlinedIcon />} label="Block" onClick={handelBlockUsers} />
        <Tab icon={<LockOpenOutlinedIcon />} label="Unblock" onClick={onUnblockUsers} />
        <Tab
          icon={<DeleteOutlineOutlinedIcon />}
          label="Delete"
          onClick={handelDeleteUsers}
        />
      </div>
      <Box sx={{ height: 800, width: "100%" }}>
        {users && (
          <DataGrid
            getRowId={(row) => row._id}
            rows={users}
            checkboxSelection
            columns={columns}
            onSelectionModelChange={(selectionModel: GridSelectionModel) =>
              rowSelection(selectionModel)
            }
            pageSize={6}
            rowsPerPageOptions={[6]}
            disableSelectionOnClick
          />
        )}
      </Box>
    </div>
  );
};
