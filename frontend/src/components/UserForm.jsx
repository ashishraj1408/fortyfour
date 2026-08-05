import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

const emptyUserValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: {
    street: '',
    city: '',
    zip: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
};

const getDefaultValues = (initialValues = {}) => ({
  ...emptyUserValues,
  ...initialValues,
  address: {
    ...emptyUserValues.address,
    ...(initialValues.address || {}),
    geo: {
      ...emptyUserValues.address.geo,
      ...(initialValues.address?.geo || {}),
    },
  },
});

const schema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().required('Email is required').email('Please provide a valid email'),
  phone: yup.string().trim().required('Phone is required'),
  company: yup.string().trim().required('Company is required'),
  address: yup.object({
    street: yup.string().trim().required('Street is required'),
    city: yup.string().trim().required('City is required'),
    zip: yup.string().trim().required('Zipcode is required'),
    geo: yup.object({
      lat: yup
        .number()
        .typeError('Latitude must be numeric')
        .required('Latitude is required')
        .min(-90, 'Latitude must be numeric between -90 and 90')
        .max(90, 'Latitude must be numeric between -90 and 90'),
      lng: yup
        .number()
        .typeError('Longitude must be numeric')
        .required('Longitude is required')
        .min(-180, 'Longitude must be numeric between -180 and 180')
        .max(180, 'Longitude must be numeric between -180 and 180'),
    }),
  }),
});

const UserForm = ({ initialValues, onSubmit, submitLabel = 'Save', disabled = false, title = 'User Form' }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    reset(getDefaultValues(initialValues));
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Name" error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Phone" error={!!errors.phone} helperText={errors.phone?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Company" error={!!errors.company} helperText={errors.company?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Street" error={!!errors.address?.street} helperText={errors.address?.street?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="City" error={!!errors.address?.city} helperText={errors.address?.city?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="address.zip"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Zipcode" error={!!errors.address?.zip} helperText={errors.address?.zip?.message} />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name="address.geo.lat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Latitude"
                  type="number"
                  step="any"
                  value={field.value ?? ''}
                  onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                  error={!!errors.address?.geo?.lat}
                  helperText={errors.address?.geo?.lat?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name="address.geo.lng"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Longitude"
                  type="number"
                  step="any"
                  value={field.value ?? ''}
                  onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                  error={!!errors.address?.geo?.lng}
                  helperText={errors.address?.geo?.lng?.message}
                />
              )}
            />
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
