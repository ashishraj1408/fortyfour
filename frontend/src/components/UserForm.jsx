import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

const emptyUserValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  street: '',
  city: '',
  zipcode: '',
  latitude: '',
  longitude: '',
};

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Please provide a valid email'),
  phone: yup.string().required('Phone is required'),
  company: yup.string().required('Company is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  zipcode: yup.string().required('Zipcode is required'),
  latitude: yup.number().typeError('Latitude must be numeric').required('Latitude is required'),
  longitude: yup.number().typeError('Longitude must be numeric').required('Longitude is required'),
});

const UserForm = ({ initialValues, onSubmit, submitLabel = 'Save', disabled = false, title = 'User Form' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...emptyUserValues, ...(initialValues || {}) },
  });

  useEffect(() => {
    reset({ ...emptyUserValues, ...(initialValues || {}) });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Phone" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Company" {...register('company')} error={!!errors.company} helperText={errors.company?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Street" {...register('street')} error={!!errors.street} helperText={errors.street?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Zipcode" {...register('zipcode')} error={!!errors.zipcode} helperText={errors.zipcode?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField fullWidth label="Latitude" type="number" step="any" {...register('latitude')} error={!!errors.latitude} helperText={errors.latitude?.message} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField fullWidth label="Longitude" type="number" step="any" {...register('longitude')} error={!!errors.longitude} helperText={errors.longitude?.message} />
          </Grid>
        </Grid>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
          <Button variant="outlined" type="button" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={disabled || isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UserForm;
