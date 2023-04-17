import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";
import userService from '../../services/users';
import {useSelector} from "react-redux";



const theme = createTheme();

function ChangePasswordForm() {

  const user = useSelector((state) => {
    return state.user
  })
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    await userService.changePassword(
      {
        userId: user.id,
        password: data.get('password'),
        newPassword: data.get('newPassword')
      }
    )


    //TODO: what now? Some feedback
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Old password"
              name="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              name="newPassword"
              label="New password"
              id="newPassword"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              name="newPassword"
              label="Confirm new password"
              id="confirmNewPassword"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ChangePasswordForm