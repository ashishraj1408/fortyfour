import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import toast from 'react-hot-toast';
import userApi from '../api/userApi';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import DeleteDialog from '../components/DeleteDialog';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((user) => {
      return [user.name, user.email, user.company].some((field) => field?.toLowerCase().includes(term));
    });
  }, [users, search]);

  const confirmDelete = async () => {
    if (!deleteUserId) return;

    setDeleting(true);
    try {
      await userApi.deleteUser(deleteUserId);
      setDeleteUserId(null);
      toast.success('User deleted successfully');
      await loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Search, view, edit, or remove users from your CRM workspace.
                </Typography>
              </Box>
              <TextField
                placeholder="Search by name, email, company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {loading ? (
          <Loader message="Fetching users..." />
        ) : filteredUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <TableContainer component={Card} sx={{ borderRadius: 4, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton color="primary" onClick={() => navigate(`/users/${user.id}`)}>
                          <VisibilityRoundedIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => navigate(`/users/edit/${user.id}`)}>
                          <EditRoundedIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => setDeleteUserId(user.id)}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>

      <DeleteDialog
        open={Boolean(deleteUserId)}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </Container>
  );
};

export default Dashboard;
