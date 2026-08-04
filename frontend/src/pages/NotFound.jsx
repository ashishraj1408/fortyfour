import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
    <Typography variant="h3" fontWeight={700}>404</Typography>
    <Typography variant="h6">Page not found</Typography>
    <Button component={Link} to="/users" variant="contained">
      Go to Dashboard
    </Button>
  </Box>
);

export default NotFound;
