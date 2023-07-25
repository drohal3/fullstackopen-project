import Nav from "../../components/layout/Nav";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Drawer, ListItemButton, ListItemIcon} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Alerts from "../../components/layout/alert/Alerts";
import {useAuthData} from "../../hooks/useAuthHooks";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function UserDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useAuthData()
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen( open );
  };

  const list = () => (
  <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key="profile" disablePadding onClick={() => navigate('/profile')}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItemButton>
        </ListItem>
        <ListItem key="settings" disablePadding onClick={() => navigate('/settings')}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem style={{ color: '#ab0000' }} key="logout" disablePadding onClick={() => navigate('/logout')}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#ab0000' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Button onClick={toggleDrawer(true)}>{`${user.firstName} ${user.lastName}`}</Button>
    </>

  )

}

function TopNavLayout (props) {
  const user = useAuthData()

  const { logButtons = true } = props

  let buttons = null;

  if (logButtons) {
    buttons = (user.token)
      ? (
        // <Button href="/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        //   Logout
        // </Button>
        <UserDrawer />
      )
      : (
        <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      );
  }

  return (
    <>
      <Alerts />
      <Nav>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Features
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Enterprise
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Support
        </Link>
        { buttons }
      </Nav>
      { props.children }
      <Copyright sx={{ mt: 8, mb: 4 }}/>
    </>

  )
}

export default TopNavLayout;