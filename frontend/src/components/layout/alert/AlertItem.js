import {Alert} from "@mui/material";

function AlertItem( {alert} ) {
  return (
    <Alert severity={alert.type}>{alert.message}</Alert>
  )
}

export default AlertItem