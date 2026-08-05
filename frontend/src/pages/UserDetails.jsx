import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import userApi from '../api/userApi';
import Loader from '../components/Loader';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await userApi.getUserById(id);
        setUser(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch user');
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  if (loading) return <Loader message="Loading user details..." />;
  if (!user) return null;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Card >
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
              <Typography variant="h4" fontWeight={700}>User Details</Typography>
              <Button variant="outlined" onClick={() => navigate('/users')}>Back</Button>
            </Stack>
            <Divider />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                <Typography variant="body1">{user.company}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                <Typography variant="body1">{user.address?.street}, {user.address?.city}, {user.address?.zip}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Geo Coordinates</Typography>
                <Chip label={`${user.address?.geo?.lat}, ${user.address?.geo?.lng}`} />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetails;
