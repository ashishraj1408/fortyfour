import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" component={Link} to="/users" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
          FortyFour CRM
        </Typography>
      </Box>
      <Button component={Link} to="/users/new" variant="contained">
        New User
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
