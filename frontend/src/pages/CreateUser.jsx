import { Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import userApi from '../api/userApi';
import UserForm from '../components/UserForm';

const CreateUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await userApi.createUser(values);
      toast.success('User created successfully');
      navigate('/users');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <UserForm onSubmit={handleSubmit} submitLabel="Create User" title="Create User" />
      </Paper>
    </Container>
  );
};

export default CreateUser;
