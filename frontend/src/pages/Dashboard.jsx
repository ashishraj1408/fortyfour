import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const loadUsers = async (opts = {}) => {
    setLoading(true);
    try {
      const params = {
        page: opts.page ?? page,
        limit: opts.limit ?? limit,
        search: opts.search ?? search,
      };

      const response = await userApi.getAllUsers(params);
      setUsers(response.data || []);
      if (response.meta) {
        setTotal(response.meta.total || 0);
        setPage(response.meta.page || params.page);
        setLimit(response.meta.limit || params.limit);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // initialize from URL
  useEffect(() => {
    const sp = Object.fromEntries([...searchParams]);
    const initialSearch = sp.search || '';
    const initialPage = Number(sp.page) || 1;
    const initialLimit = Number(sp.limit) || 10;

    setSearch(initialSearch);
    setPage(initialPage);
    setLimit(initialLimit);

    loadUsers({ search: initialSearch, page: initialPage, limit: initialLimit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We fetch filtered results from backend; keep memo for small UI transformations if needed
  const filteredUsers = users;

  // debounce search input
  const debouncedSearch = useCallback(
    (() => {
      let timeout = null;
      return (val) => {
        if (timeout) clearTimeout(timeout);
        return new Promise((resolve) => {
          timeout = setTimeout(() => {
            timeout = null;
            resolve(val);
          }, 500);
        });
      };
    })(),
    []
  );

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
        <Card >
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
              <Box >
                <Typography variant="h4" fontWeight={700} className='rounded-sm' >
                  Dashboard
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Search, view, edit, or remove users from your CRM workspace.
                </Typography> */}
              </Box>
              <TextField
                placeholder="Search by name, email, company"
                value={search}
                onChange={async (e) => {
                  const val = e.target.value;
                  setSearch(val);
                  const debounced = await debouncedSearch(val);
                  // update URL and reset to page 1
                  setSearchParams({ ...(debounced ? { search: debounced } : {}), page: '1', limit: String(limit) });
                  await loadUsers({ search: debounced, page: 1, limit });
                }}
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
          <TableContainer component={Card} >
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
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">{`Showing ${users.length} of ${total} users`}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  disabled={page <= 1}
                  onClick={async () => {
                    const newPage = Math.max(1, page - 1);
                    setPage(newPage);
                    setSearchParams({ ...(search ? { search } : {}), page: String(newPage), limit: String(limit) });
                    await loadUsers({ page: newPage, limit, search });
                  }}
                >
                  Previous
                </Button>
                <Typography>{`Page ${page} of ${Math.max(1, Math.ceil(total / limit))}`}</Typography>
                <Button
                  disabled={page >= Math.ceil(total / limit)}
                  onClick={async () => {
                    const newPage = page + 1;
                    setPage(newPage);
                    setSearchParams({ ...(search ? { search } : {}), page: String(newPage), limit: String(limit) });
                    await loadUsers({ page: newPage, limit, search });
                  }}
                >
                  Next
                </Button>
              </Stack>
            </Box>
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
