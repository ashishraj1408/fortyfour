import { useEffect, useState } from 'react';
import { Container, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import userApi from '../api/userApi';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await userApi.getUserById(id);
        setInitialValues(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load user');
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      await userApi.updateUser(id, values);
      toast.success('User updated successfully');
      navigate(`/users/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update user');
    }
  };

  if (loading) return <Loader message="Loading user details..." />;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4}}>
        <UserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel="Update User"
          title="Edit User"
        />
      </Paper>
    </Container>
  );
};

export default EditUser;
