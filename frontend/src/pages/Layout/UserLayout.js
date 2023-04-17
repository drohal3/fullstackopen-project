
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import TopNavLayout from "./TopNavLayout";


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};



function UserLayout ( props ) {
  return (
    <TopNavLayout>
      <Box sx={{ flexGrow: 1, margin: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Change Password" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={9}>
            { props.children }
          </Grid>

        </Grid>
      </Box>
    </TopNavLayout>
  )
}

export default UserLayout