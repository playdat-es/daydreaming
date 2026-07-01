import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { APP_PRODUCT_NAME } from "@shared/branding";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{APP_PRODUCT_NAME}</Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
