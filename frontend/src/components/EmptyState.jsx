import { Box, Button, Typography } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Link } from 'react-router-dom';

const EmptyState = ({ title = 'No Users Found', message = 'There are no matching users to display.' }) => (
  <Box
    sx={{
      minHeight: 260,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 2,
      py: 5,
    }}
  >
    <SearchOffRoundedIcon sx={{ fontSize: 52, color: 'text.disabled' }} />
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
    <Button component={Link} to="/users/new" variant="contained">
      Add User
    </Button>
  </Box>
);

export default EmptyState;
