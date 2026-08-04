import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          <Typography variant="body2">{user.phone}</Typography>
          <Typography variant="body2">{user.company}</Typography>
          <Chip label={`${user.city}, ${user.zipcode}`} size="small" />
          <Typography variant="caption" color="text.secondary">
            {user.latitude}, {user.longitude}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserCard;
